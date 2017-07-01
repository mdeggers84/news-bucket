$(document).ready(function () {
  function setActiveLink() {
    var page = window.location.pathname;
    switch (page) {
      case '/':
        $('#nav-home').addClass('active');
        break;
      case '/saved':
        $('#nav-saved').addClass('active');
        break;
      default:
        $('#navbar a').removeClass();
    }
  }

  function checkArticles() {
    var page = window.location.pathname;
    var html;

    if ($('#news').text().trim() === '') {
      if (page === '/saved') {
        html = '<h1 class="text-center">You haven\'t saved any articles yet!</h1>';
        $('#news').html(html);
      }
    }
  }

  $('#commentModal').on('shown.bs.modal', function () {
    $('#new-comment').focus();
  });

  $(document).on('click', '.save-news', function (event) {
    event.preventDefault();
    $('#modal-title').text('');
    $('#modal-msg').empty();
    $('#modal-img').attr('src', '');
    var doc = {};

    doc.title = $(this).parent().parent().parent()
      .prev()
      .find('[class=panel-title]')
      .text();
    doc.link = $(this).parent().prev()
      .find('a')
      .text();
    doc.image = $(this).parent().prev().prev()
      .find('img')
      .attr('src');

    $('#modal-img').attr('src', doc.image);
    $('#modal-title').text(doc.title);

    $.post('/api/savednews/', doc).done(function (saved) {
      if (saved) {
        $('#modal-msg').text('Article saved!');
        console.log('Article saved.');
      } else {
        $('#modal-msg').text('Article not saved!');
        console.log('Article not saved');
      }
    });
  });

  $(document).on('click', '.delete-news', function (event) {
    var newsID = $(this).data('id');

    $(this).parent().parent().parent()
      .parent()
      .hide();

    $.ajax({
      url: '/api/savednews/' + newsID,
      type: 'DELETE',
      success: function (result) {
        console.log(result);
      }
    });
  });

  $(document).on('click', '.comment-btn', function (event) {
    event.preventDefault();
    var newsID = $(this).data('id');
    var title = $(this).parent().parent().parent()
      .prev()
      .find('[class=panel-title]')
      .text();

    $('#prev-comments').empty();
    $('#new-comment').val('');
    $('#commentTitle').text(title);
    $('#save-comment').data('id', newsID);

    $.get('/api/savednews/' + newsID).done(function (data) {
      if (typeof data.comments !== 'undefined') {
        var commentsArr = data.comments;
        var html = '';
        for (var i = 0; i < commentsArr.length; i += 1) {
          html = '<div class="row prev-comments">' +
          '<div class="col-md-10">' +
            commentsArr[i].body +
            '</div>' +
            '<div class="col-md-2 text-right">' +
            '<button class="delete-comment btn btn-danger" data-id="' + commentsArr[i]._id + '">X</button>' +
            '</div>' +
            '</div>';
          $('#prev-comments').append(html);
        }
      }
    });
  });

  $(document).on('click', '#save-comment', function (event) {
    event.preventDefault();
    var newComment = {};
    var thisID = $('#save-comment').data('id');

    newComment.body = $('#new-comment').val();

    $.post('/api/comments/' + thisID, newComment);
  });

  $(document).on('click', '.delete-comment', function (event) {
    event.preventDefault();
    var thisID = $(this).data('id');

    $(this).parent().parent().hide();

    $.ajax({
      url: '/api/comments/' + thisID,
      type: 'DELETE',
      success: function (result) {
        console.log(result);
      }
    });
  });

  setActiveLink();
  checkArticles();
});

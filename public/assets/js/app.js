$(document).ready(function () {
  function setActiveLink() {
    var page = window.location.pathname;
    switch (page) {
      case '/':
        $('#nav-home').addClass('active');
        break;
      case '/saved':
        $('#nav-saved').addClass('active');
        $('#scrape').hide();
        break;
      default:
        $('#navbar a').removeClass();
    }
  }

  function checkArticles() {
    var page = window.location.pathname;
    var html;

    console.log(page, $('#news').text().trim());

    if ($('#news').text().trim() === '') {
      if (page === '/') {
        html = '<h1 class="text-center">You haven\'t scraped any articles yet!</h1>';
        $('#news').html(html);
      } else if (page === '/saved') {
        html = '<h1 class="text-center">You haven\'t saved any articles yet!</h1>';
        $('#news').html(html);
      }
    }
  }

  $('#commentModal').on('shown.bs.modal', function () {
    $('#new-comment').focus();
  });

  $('#scrape-btn').on('click', function () {
    $.get('/scrape').done(function () {
      location.reload();
    });
  });

  $(document).on('click', '.save-news', function (event) {
    event.preventDefault();
    var doc = {};

    doc.title = $(this).parent().parent().parent()
      .prev()
      .find('[class=panel-title]')
      .text();
    doc.link = $(this).parent().prev()
      .find('a')
      .text();

    $.post('/api/savednews/', doc);
  });

  $(document).on('click', '.delete-news', function (event) {
    var newsID = $(this).data('id');

    $(this).parent().parent().parent()
      .parent()
      .hide();

    $.ajax({
      url: '/api/savednews/' + newsID,
      type: 'DELETE',
      success: function (data) {
        console.log(data);
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
      console.log(data);

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
    console.log($('#save-comment').data('id'));
  });

  $(document).on('click', '#save-comment', function (event) {
    event.preventDefault();
    var newComment = {};
    var thisID = $('#save-comment').data('id');
    console.log('current: ' + $('#save-comment').data('id'), 'var: ' + thisID);

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
      success: function (data) {
        console.log(data);
      }
    });
  });

  setActiveLink();
  checkArticles();
});

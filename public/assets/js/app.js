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

  $('#commentModal').on('shown.bs.modal', function () {
    $('#new-comment').focus();
  });

  $(document).on('click', '.save-btn', function (event) {
    event.preventDefault();
    var doc = {};

    doc.title = $(this).parent().parent().parent()
      .prev()
      .find('[class=panel-title]')
      .text();
    doc.link = $(this).parent().prev()
      .find('a')
      .text();

    $.post('/api/news/', doc);
  });

  $(document).on('click', '.delete-news', function (event) {
    var newsID = $(this).data('id');

    $(this).parent().parent().parent()
      .parent()
      .hide();

    $.ajax({
      url: '/api/news/' + newsID,
      type: 'DELETE',
      success: function (data) {
        console.log(data);
      }
    });
  });

  $(document).on('click', '.comment-btn', function (event) {
    event.preventDefault();
    var newsID = $(this).data('id');

    $('#prev-comments').empty();
    $('#new-comment').val('');

    $.get('/api/news/' + newsID).done(function (data) {
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

      $('#commentTitle').text(data.title);
      $('#save-comment').attr('data-id', newsID);
    });
  });

  $(document).on('click', '#save-comment', function (event) {
    event.preventDefault();
    var newComment = {};
    var newsID = $(this).data('id');

    newComment.body = $('#new-comment').val();

    $.post('/api/comments/' + newsID, newComment);
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
});

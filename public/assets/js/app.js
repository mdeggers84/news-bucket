$(document).ready(function () {
  $('#commentModal').on('shown.bs.modal', function () {
    $('#new-comment').focus();
  });

  $(document).on('click', '.save-btn', function (event) {
    event.preventDefault();
    var doc = {};

    doc.title = $(this).parent().prev()
      .find('[class=title]')
      .text();
    doc.link = $(this).parent().prev()
      .find('a')
      .text();

    $.post('/api/news/', doc);
  });

  $(document).on('click', '.delete-btn', function (event) {

  });

  $(document).on('click', '.comment-btn', function (event) {
    event.preventDefault();
    var newsID = $(this).data('id');
    getComments(newsID);
    
    $('#prev-comments').empty();
    $('#new-comment').val('');

    $.get('/api/news/' + newsID).done(function (data) {
      console.log(data);

      if (typeof data.comments !== 'undefined') {
        var commentsArr = data.comments;
        var html = '';
        for (var i = 0; i < commentsArr.length; i += 1) {
          html = '<div class="row">' +
            '<div class="col-md-8">' +
            commentsArr[i].body +
            '</div>' +
            '<div class="col-md-4">' +
            '<button class="delete-comment" data-id="' + commentsArr[i]._id + '">X</button>' +
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

    $.ajax({
      url: '/api/comments/' + thisID,
      type: 'DELETE',
      success: function (data) {
        console.log(data);
      }
    });
  });
});

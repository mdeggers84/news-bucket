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

  $(document).on('click', '.comment-btn', function (event) {
    event.preventDefault();
    var newsID = $(this).data('id');
    $('#prev-comments').empty();

    $.get('/api/news/' + newsID).done(function (data) {
      var html = '';

      if (typeof data.comments !== 'undefined') {
        console.log(data.comments.body);
        html = '<div>' +
        '<p>' + data.comments.body + '</p>' +
        '</div>';
      }

      $('#commentTitle').text(data.title);
      $('#save-comment').attr('data-id', newsID);
      $('#prev-comments').html(html);
    });
  });

  $(document).on('click', '#save-comment', function (event) {
    event.preventDefault();
    var newComment = {};
    var newsID = $(this).data('id');

    newComment.body = $('#new-comment').val();

    $.post('/api/comments/' + newsID, newComment);
  });
});

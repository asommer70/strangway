$(document).ready(function() {
  $(document).foundation();

  $('.hider').on('click', function(e) {
    e.preventDefault();

    $this = $(this);
    $('#' + $this.data().hider).toggleClass('hide');
  });

  $('.dbl-hider').contextmenu(function() {
    // e.preventDefault();

    $this = $(this);
    $('#' + $this.data().hider).toggleClass('hide');

  });
});

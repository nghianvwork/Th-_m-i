$(document).ready(function () {
  const envelope = $('#envelope');
  const openBtn = $("#openBtn");
  const resetBtn = $("#resetBtn");
  let isOpen = false;

  // Set current date
  const today = new Date();
  const dateString = today.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });
  $('#current-date').text(dateString);
  $('#signature-date').text(dateString);

  openBtn.on('click', function () {
      envelope.removeClass("close").addClass("open");
      $('body').addClass('modal-open');
      isOpen = true;
      setTimeout(function() {
          openBtn.hide();
          resetBtn.show();
      }, 200);
      playAudioOnce();
  });

  resetBtn.on('click', function () {
      resetBtn.hide();
      envelope.removeClass("open").addClass("close");
      $('body').removeClass('modal-open');
      isOpen = false;
      setTimeout(function () {
          openBtn.show();
      }, 500);
  });
  
  // Add backdrop click to close
  $(document).on('click', function(e) {
      if (envelope.hasClass('open') && !$(e.target).closest('.letter, .controls').length) {
          resetBtn.click();
      }
  });
});

const audio = document.getElementById("sound");
let hasPlayed = false;

function playAudioOnce() {
    if (!hasPlayed) {
        audio.play().then(() => {
            hasPlayed = true;
        }).catch((e) => {
            console.log("Không thể phát nhạc:", e);
        });
    }
}
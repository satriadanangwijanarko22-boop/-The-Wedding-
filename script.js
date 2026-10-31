const weddingDate = new Date("2027-06-20T08:00:00+07:00");
const whatsappNumber = "6281234567890";

const countdownFields = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

function updateCountdown() {
  const remaining = weddingDate.getTime() - Date.now();

  if (remaining <= 0) {
    Object.values(countdownFields).forEach((field) => {
      field.textContent = "0";
    });
    return;
  }

  const seconds = Math.floor(remaining / 1000);
  countdownFields.days.textContent = String(Math.floor(seconds / 86400));
  countdownFields.hours.textContent = String(Math.floor((seconds % 86400) / 3600)).padStart(2, "0");
  countdownFields.minutes.textContent = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  countdownFields.seconds.textContent = String(seconds % 60).padStart(2, "0");
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

document.querySelector("#rsvp-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = formData.get("name").toString().trim();
  const attendance = formData.get("attendance");
  const guests = formData.get("guests");
  const message = formData.get("message").toString().trim();

  const lines = [
    "Assalamu’alaikum, saya ingin mengonfirmasi undangan pernikahan:",
    `Nama: ${name}`,
    `Konfirmasi: ${attendance}`,
    `Jumlah tamu: ${guests} orang`,
  ];

  if (message) {
    lines.push(`Ucapan/doa: ${message}`);
  }

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

document.querySelector("#copy-account").addEventListener("click", async () => {
  const accountNumber = document.querySelector("#account-number").textContent.trim();
  const status = document.querySelector("#copy-status");

  try {
    await navigator.clipboard.writeText(accountNumber);
    status.textContent = "Nomor rekening berhasil disalin.";
  } catch (error) {
    status.textContent = "Gagal menyalin. Silakan salin nomor rekening secara manual.";
  }
});

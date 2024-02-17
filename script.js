const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_MSGS = {
  ACETAMINOPHEN: "Acetaminophen's RxNorm code is 198440.",
  PARACETAMOL: "Paracetamol's (Acetaminophen) RxNorm code is 198440.",
  ASPIRIN: "Aspirin's RxNorm code is 144206.",
  IBUPROFEN: "Ibuprofen's RxNorm code is 263326.",
  LISINOPRIL: "Lisinopril's RxNorm code is 209468.",
  SIMVASTATIN: "Simvastatin's RxNorm code is 211539.",
  METFORMIN: "Metformin's RxNorm code is 69763.",
  LEVOTHYROXINE: "Levothyroxine's RxNorm code is 208127.",
  AMOXICILLIN: "Amoxicillin's RxNorm code is 202103.",
  ATORVASTATIN: "Atorvastatin's RxNorm code is 849217.",
  HYDROCHLOROTHIAZIDE: "Hydrochlorothiazide's RxNorm code is 315013.",
  OMEPRAZOLE: "Omeprazole's RxNorm code is 813065.",
  ALBUTEROL: "Albuterol's RxNorm code is 245314.",
  METOPROLOL: "Metoprolol's RxNorm code is 234495.",
  AMLODIPINE: "Amlodipine's RxNorm code is 197363.",
  PANTOPRAZOLE: "Pantoprazole's RxNorm code is 198496.",
  SERTRALINE: "Sertraline's RxNorm code is 312941.",
  WARFARIN: "Warfarin's RxNorm code is 32975.",
  TRAMADOL: "Tramadol's RxNorm code is 3622.",
  CITALOPRAM: "Citalopram's RxNorm code is 95558.",
  FLUOXETINE: "Fluoxetine's RxNorm code is 9067."
};

const BOT_IMG = "robot.png";
const PERSON_NAME = "Visitor";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value.trim();
  if (!msgText) return;

  appendMessage(PERSON_NAME,  "user.png", "right", msgText);
  msgerInput.value = "";

  botResponse(msgText);
});

function appendMessage(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse(msgText) {
  const drugName = extractDrugName(msgText);
  const botMsgText = BOT_MSGS[drugName] ? BOT_MSGS[drugName] : "Sorry, I don't have information for that drug.";

  const delay = msgText.split(" ").length * 100;

  setTimeout(() => {
    appendMessage("RxNorm Code Provider BOT", BOT_IMG, "left", botMsgText);
  }, delay);
}

function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();
  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function extractDrugName(text) {
  const keywords = Object.keys(BOT_MSGS);
  const lowerCaseText = text.toLowerCase();
  const foundKeyword = keywords.find(keyword => lowerCaseText.includes(keyword.toLowerCase()));
  return foundKeyword ? foundKeyword : "";
}

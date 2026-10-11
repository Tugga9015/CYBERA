const express = require("express");

const router = express.Router();

// POST /api/analyze
router.post("/", (req, res) => {
  const { message } = req.body;

  const text = message.toLowerCase();

  const warningSigns = [];

  if (text.includes("you have won")) {
    warningSigns.push("Unexpected prize claim");
  }

  if (text.includes("act now")) {
    warningSigns.push("Urgency Pressure");
  }

  if (text.includes("share your password")|| text.includes("send your pin") || text.includes("Verification code") ) {
    warningSigns.push("Suspicious Request for Sensitive Information");
  }

  if (text.includes("click this link") || text.includes("visit this website")) {
    warningSigns.push("Suspicious Link or Website");
  }

  if (text.includes("pay immediately") || text.includes("send money") || text.includes("urgent payment")) {
    warningSigns.push("Suspicious Financial Request");
  } 

  if (text.includes("too good to be true") || text.includes("guaranteed")) {
    warningSigns.push("Unrealistic Promises");
  }

  if (text.includes("free gift") || text.includes("free trial")) {
    warningSigns.push("Suspicious Free Offer");
  }

  if (text.includes("limited time offer") || text.includes("exclusive deal")) {
    warningSigns.push("Suspicious Marketing Tactic");
  }

  if (text.includes("click here to claim") || text.includes("download now")) {
    warningSigns.push("Suspicious Call to Action");
  }

  if (text.includes("urgent response required") || text.includes("immediate action needed")) {
    warningSigns.push("Suspicious Urgency");
  }

  if (text.includes("verify your account") || text.includes("confirm your identity")) {
    warningSigns.push("Suspicious Account Verification Request from non official source");
  }

  //Risk level
  let risklevel;

  if (warningSigns.length === 0) {
    risklevel = "No obvious warning signs";
  } else if (warningSigns.length === 1) {
    risklevel = "Caution";
  } else {
    risklevel = "High Suspicion";
  }

  //Explanation
  let explanation;

  if (risklevel === "No obvious warning signs") {
    explanation = "No known warning signs were detected by the current checks.";
  } else if (risklevel === "Caution") {
    explanation =
      "The message contains a warning sign that deserves attention.";
  } else {
    explanation =
      "The message contains multiple warning signs, commomnly associated with scams, indicating a high level of suspicion. Please be very cautious.";
  }

  // Check whether a message was provided
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid message to analyze.",
    });
  }

  // Temporary response while we build the analysis logic
  res.status(200).json({
    success: true,
    submittedMessage: message,
    warningSigns: warningSigns,
    risklevel: risklevel,
    explanation: explanation,
  });
});

module.exports = router;

const express = require("express");

const router = express.Router();

// POST /api/analyze
router.post("/", (req, res) => {
  const { message } = req.body;

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid message to analyze.",
    });
  }

  const text = message.toLowerCase();

  const warningSigns = [];

  if (text.includes("you have won")) {
    warningSigns.push("Unexpected prize claim");
  }

  if (text.includes("act now")) {
    warningSigns.push("Urgency Pressure");
  }

  if (
    text.includes("share your password") ||
    text.includes("send your pin") ||
    text.includes("verification code")
  ) {
    warningSigns.push("Suspicious Request for Sensitive Information");
  }

  if (text.includes("click this link") || text.includes("visit this website")) {
    warningSigns.push("Suspicious Link or Website");
  }

  if (
    text.includes("pay immediately") ||
    text.includes("send money") ||
    text.includes("urgent payment")
  ) {
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

  if (
    text.includes("urgent response required") ||
    text.includes("immediate action needed")
  ) {
    warningSigns.push("Suspicious Urgency");
  }

  if (
    text.includes("verify your account") ||
    text.includes("confirm your identity")
  ) {
    warningSigns.push(
      "Suspicious Account Verification Request from non official source",
    );
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

  if (warningSigns.length === 0) {
    explanation =
      "Our current checks did not detect any known warning signs. This does not guarantee that the message is safe.";
  } else {
    explanation =
      "We detected the following warning Signs:" +
      warningSigns.join(",") +
      ". These signs may indicate a scam, so verify the message before taking action.";
  }

  // Check whether a message was provided
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid message to analyze.",
    });
  }

  // Recommendation
  let recommendation;

  if (warningSigns.length === 0) {
    recommendation =
      "Stay alert. No detected warning signs does not guarantee that the message is safe.";
  } else if (warningSigns.length === 1) {
    recommendation =
      "Be cautious. Verify the message and its source before taking any action.";
  } else {
    recommendation =
      "Be cautious. Do not respond to the message and report it to the appropriate authorities.";
  }

  // Send the response
  return res.status(200).json({
    success: true,
    submittedMessage: message,
    warningSigns: warningSigns,
    riskLevel: risklevel,
    explanation: explanation,
    recommendation: recommendation,
  });
});

module.exports = router;

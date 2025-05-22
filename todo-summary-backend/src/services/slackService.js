const axios = require('axios');

const slackService = {
  async sendToSlack(summary) {
    try {
      const webhookUrl = process.env.SLACK_WEBHOOK_URL;
      
      const message = {
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "📋 Todo Summary Report",
              emoji: true
            }
          },
          {
            type: "divider"
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: summary
            }
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `*Generated on:* ${new Date().toLocaleString()}`
              }
            ]
          }
        ]
      };
      
      await axios.post(webhookUrl, message);
      return true;
    } catch (error) {
      console.error('Error sending to Slack:', error);
      throw new Error('Failed to send summary to Slack');
    }
  }
};

module.exports = slackService;
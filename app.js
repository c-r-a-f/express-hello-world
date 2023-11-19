const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const port = 9999;

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.post('/conversation', (req, res) => {
  const id = uuidv4()
  res.json({ conversationId: id });
});

app.post('/conversation/:conversationId/user/attributes', (req, res) => {
  console.log(req.body)
  res.json({
    conversationId: req.params.conversationId,
    attributes: req.body,
    ok: true
  })
});

app.post('/conversation/reply', (req, res) => {
  console.log(req.body)
  res.json({
    messageId: '1',
    created: new Date().getTime(),
    message: {
      type: 'text',
      role: 'assistant',
      content: `お返事：${Math.random()}`, 
    },
    canSuggest: 0.5 < Math.random(),
  })
});


// サーバーを起動
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


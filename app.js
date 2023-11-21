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

const messages = [
  '移住先で、地域の歴史や文化にどのように関わりたいですか？例えば、地域の祭りや伝統行事に参加することや、地域固有の文化を学ぶことに興味はありますか？また、その地域の歴史的な建造物や景観に魅力を感じることはありますか？',,
  '移住先での住まいに関して、どのようなタイプの住宅を希望されますか？例えば、一軒家、マンション、田舎の古民家などが考えられます。また、日常生活で重視する点、例えば通勤や買い物の利便性などについても教えていただけますか？',
  'ランニングを楽しむ上で、自然の中で走ることにどのような魅力を感じますか？また、移住先に求める自然環境について教えていただけますか？例えば、森林や海岸、山など特定の景観を望んでいますか？',
  '移住後の生活を想像すると、どのような日常を過ごしたいですか？例えば、静かな環境でのんびりと過ごすことや、地域コミュニティに積極的に参加することなど、具体的なイメージがありますか？また、地域のコミュニティにどのように関わりたいと考えていますか？',
]

const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return messages[randomIndex];
}


app.post('/conversation/reply', (req, res) => {
  console.log(req.body)
  res.json({
    messageId: '1',
    created: new Date().getTime(),
    message: {
      type: 'text',
      role: 'assistant',
      content: `テストメッセージです。${getRandomMessage()}`,
    },
    canSuggest: 0.5 < Math.random(),
  })
});


// サーバーを起動
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


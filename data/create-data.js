// based on https://flaviocopes.com/canvas-node-generate-image/
const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

const width = 600
const height = 600

const createTokenData = async (tokenindex) =>  {
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')

  context.fillStyle = '#9F0034'
  context.fillRect(0, 0, width, height)

  const text = 'Hello, Tweaker!'
  const text2 = 'Token #' + tokenindex

  context.font = 'bold 40pt Menlo'
  context.textAlign = 'center'
  context.textBaseline = 'top'
  context.fillStyle = '#3574d4'
  const textWidth = context.measureText(text).width
  context.fillRect(300 - textWidth / 2 - 10, 140, textWidth + 20, 120)
  context.fillStyle = '#fff'
  context.fillText(text, 300, 170)


  context.fillStyle = '#3574d4'
  const textWidth2 = context.measureText(text2).width
  context.fillRect(300 - textWidth2 / 2 - 10, 320, textWidth2 + 20, 120)
  context.fillStyle = '#fff'
  context.fillText(text2, 300, 350)

  context.fillStyle = '#fff'
  context.font = 'bold 30pt Menlo'
  context.fillText('tweakers.net', 300, 530)

  loadImage('./logo.png').then(image => {
    context.drawImage(image, 300 - image.width/2, 5, image.width, image.height)
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('./' + tokenindex +'.png', buffer)
    
    let metadata = {
      "name": "Dit is een tweakers NFT",
      "description": "Gemaakt dankzij tweakers.net!",
      "image": "https://raw.githubusercontent.com/mosbuma/tweakers-nft/master/data/" + tokenindex + ".png",
      "attributes": []
    }

    fs.writeFileSync('./' + tokenindex +'.json', JSON.stringify(metadata,0,2))
  })
}

(async ()=>{
  for(tokenidx=1;tokenidx<=100;tokenidx++) {
    createTokenData(tokenidx)
  }
})();

// Right click on the script name and hit "Run" to execute
(async () => {
    try {
        console.log('Running create_nft script...')
        
        const contractName = 'Nft' 
        const contractAddress = '0x6d71e54a8e72D92d87D493348f8d7a7146BdD3C3'
        
        const newOwnerAddress = '0x4E8f25075256461c9B3C89eF7E8Ad0b8119A2A2c'
        const newMetadata = {
          "name": "This is a new NFT",
          "description": "some description here!",
          "image": "https://bumos.nl/BumosKlein.png",
          "attributes": []
        }
        const newURI = ''
    
        const artifactsPath = `browser/contracts/artifacts/${contractName}.json` // Change this for different path

        const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        const accounts = await web3.eth.getAccounts()
        
        let contractInstance = new web3.eth.Contract(metadata.abi, contractAddress);
    
        let token=await contractInstance.methods.awardItem(newOwnerAddress, newMetadata).send({
            from: accounts[0],
            gas: 1500000,
            gasPrice: '30000000000'
        })
        console.log(token)
        let owner=await contractInstance.methods.ownerOf(2).call()
        console.log('token 1 owner ', owner)
    } catch (e) {
        console.log(e.message)
    }
  })()
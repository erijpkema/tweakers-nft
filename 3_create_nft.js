// Right click on the script name and hit "Run" to execute
(async () => {
    try {
        console.log('Running create_nft script...')

        // haal de lijst met beschikbare accounts op uit metamask
        const accounts = await web3.eth.getAccounts()
        
        const contractName = 'Nft'

        const contractAddress = '' // TODO: invullen nadat het contract gedeployed is!
        if(""===contractAddress) {
          console.log("Afgebroken: vul eerst het contractadres in!");
          return;
        }
        
        // const newOwnerAddress = '' // TODO: invullen met een geldig ethereum adres
        const newOwnerAddress=accounts[0] // of gebruik het in metamask geselecteerde adres
        if(""===newOwnerAddress) {
          console.log("Afgebroken: vul eerst het adres van de nieuwe eigenaar in!");
          return;
        }

        const artifactsPath = `browser/github/mosbuma/tweakers-nft/artifacts/${contractName}.json`

        const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        let contractInstance = new web3.eth.Contract(metadata.abi, contractAddress);
        let totalSupply = await contractInstance.methods.totalSupply().call()
        let nextid = Number(totalSupply) + 1

        // maak een link naar het metadata record voor deze token
        const uri = "https://raw.githubusercontent.com/mosbuma/tweakers-nft/master/data/" + nextid.toString() +".json"
        
        // mint een nieuwe token en stuur deze naar de nieuwe eigenaar
        console.log("token " + nextid + " wordt verstuurd naar adres " + newOwnerAdddres)
        let token=await contractInstance.methods.sendNFT(newOwnerAddress, uri).send({
            from: accounts[0],
            gas: 1500000
        })
        
        console.log("bekijk de nieuwe token op opensea:", "https://testnets.opensea.io/assets/" + contractAddress + '/' + nextid)
    } catch (e) {
        console.log(e.message)
    }
  })()
// Right click on the script name and hit "Run" to execute
async function go() {
    try {
        console.log('Running create_nft script...')

        const contractName = 'Nft'

        const contractAddress = '--contract adres hier invullen--' // TODO: invullen nadat het contract gedeployed is!
        if(""===contractAddress) {
          console.log("Afgebroken: vul eerst het contractadres in!");
          return;
        }

        // haal de lijst met beschikbare accounts op uit metamask
        const accounts = await web3.eth.getAccounts()

        const newOwnerAddress=accounts[0] // gebruik deze regel om het adres uit metamask te gebruiken
        // const newOwnerAddress = '-- eigenaar adres hier invullen --' // gebruik deze regel uit om handmatig het eigenaar adres in te vullen
        if(newOwnerAddress==="") {
          console.log("Afgebroken: vul eerst het adres van de nieuwe eigenaar in!");
          return;
        }

        const artifactsPath = `browser/erijpkema/mosbuma/tweakers-nft/artifacts/${contractName}.json` // Change this for different path

        const metadata = JSON.parse(await (remix.call('fileManager', 'getFile', artifactsPath)))

        let contractInstance = new web3.eth.Contract(metadata.abi, contractAddress);
        let totalSupply = await contractInstance.methods.totalSupply().call()
        let nextid = Number(totalSupply) + 1

        // maak een link naar het metadata record voor deze token
        // const uri = "https://raw.githubusercontent.com/erijpkema/tweakers-nft/master/data/" + nextid.toString() +".json"
        const uri = "https://ipfs.io/ipfs/QmXLdR9724Fx1EPWysyrJuJcTFg7pgmRxHmamrBYZN9vLi"

        // mint een nieuwe token en stuur deze naar de nieuwe eigenaar
        console.log("token " + nextid + " wordt verstuurd naar adres " + newOwnerAddress)
        let token=await contractInstance.methods.sendNFT(newOwnerAddress, uri).send({
            from: accounts[0],
            gas: 1500000
        })

        console.log("bekijk de nieuwe token op opensea:", "https://testnets.opensea.io/assets/" + contractAddress + '/' + nextid)
    } catch (e) {
        console.log(e.message)
    }
  }

  go();

// Klik met de rechter muistoets op het script en kies run om het script uit te voeren

(async () => {
    try {
        console.log('Verstuur contract naar de blockchain')
        
        // maak een datum tijd stempel aan voor in de tokennaam
        const pad = (n) => { return ("0" + n).slice(-2) }
        
        const d = new Date()
        const suffix1 = d.getFullYear() + pad(d.getMonth()+1) + pad(d.getDate())
        const suffix2 = pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds())
        
        // pas eventueel de naam en het token aan
        const tokenName = "TWEAKER."+suffix1+"."+suffix2
        const tokenSymbol = "TWK"
        
        const contractName = 'Nft'
        const constructorArgs = [tokenName, tokenSymbol]
    
        // het script gebruikt de ABI gegevens uit de artefacten die bestaan nadat het smart contract gecompileerd is
        // Zorg ervoor dat het script en keer succesvol gecompileerd is voordat dit script wordt gebruikt!
        const artifactsPath = `browser/artifacts/${contractName}.json`

        const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        // Zorg ervoor dat metamask verbonden is met de IDE en dat "Environment" is ingesteld op "Injected Web3"
        // als dit klopt zie je "Rinkeby (4) network" vermeld staan
        
        // het geselecteerde account in metamask betaalt voor het uitrollen en wordt eigenaar
        const accounts = await web3.eth.getAccounts()
        
        // maak een nieuwe instantie van het contract
        let contract = new web3.eth.Contract(metadata.abi)
    
        // maak een transactie aan om het contract in de blockchain te zetten
        contract = contract.deploy({
            data: metadata.data.bytecode.object,
            arguments: constructorArgs
        })
    
        // verstuur de transactie naar de blockchain (bevestigen in metamask)
        const newContractInstance = await contract.send({
            from: accounts[0],
            gas: 5500000,
            // gasPrice: '30000000000'
        })
        
        
        console.log('Contract uitgerold op adres: ', newContractInstance.options.address)
        console.log('Bekijk het contract op : https://etherscan.io/address/' + newContractInstance.options.address)
    } catch (e) {
        console.log(e.message)
    }
  })()
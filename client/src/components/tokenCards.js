import React, { Component } from "react";
import McCoyContract from "../contracts/McCoyContract.json";
import getWeb3 from "../utils/getWeb3";
import { Card, Table, Container } from 'semantic-ui-react'


class TokenCards extends Component {
  state = {
    instance: null, 
    web3: null, 
    accounts:'',
    tokenId:'',
    allTokens:null, 
    myTokenList:[], 
    tokenItems:null
  }

componentDidMount = async () => {
 await this.getTotalSupply();
  this.updateCards();

}

updateCards = async(event)=>{
  console.log('updating cards..');
  try{
      //connect to web3 and contract instance 
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        console.log('update cards from ..',accounts[0]);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = McCoyContract.networks[networkId];

        const instance = new web3.eth.Contract(
          McCoyContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        this.setState({accounts, web3, instance});

    //Loop over token index and get the token Ids to make array of tokenIds
      //a counter variable
      var i;
      //get total supply of all tokenIDs that exist 
      let tokenSupply =  this.state.allTokens;
      //array to used to collect tokenId, owner address, and metadata
      const myTokenList = [];
      
      for(i=0; i < tokenSupply; i++){
        instance.methods.tokenByIndex(i).call({from: accounts[0]}, (error, result) =>{
          const tokenByIndexList = result.toString(10);

          ///FELIPE SOLUTION
          //           let ownerAddress = await functionToGetOwner();
          // let propertyN = await functionToGetPropertyN();
          // myTokenList.push({
          // key: i,
          // tokenId: result.tokenId,
          // tokenMetadata: result.tokenMetadata,
          // owner: ownerAddress,
          // propertyN: propertyN
          // });

          myTokenList.push(tokenByIndexList);
          // this.setState({myTokenList});
          // console.log('myTokenList', this.state.myTokenList);
          console.log(error, tokenByIndexList);
        }); //tokenByIndex call
      }//for loop

        console.log('the array index to tokenId..', myTokenList);
      
        //const tokenItems = myTokenList.map((tokens) => <li>{tokens}</li>);
             
        // CALL THESE METHODS FOR ALL TOKENS IN THE ARRAY < totalSupply
        // TODO try giving these functions param 'i' to loop over
        this.getTokenByIndex(4);

        this.getOwnerAddress();
       
        this.getTokenMetaData();
  } //try
  catch(error){
    console.log('error updating cards', error)
  }
}//updateCards

/*Functions to use inside updateCards and loop over to push to myTokenList*/
getOwnerAddress = async(event)=>{
  try{
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        console.log('update cards from ..',accounts[0]);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = McCoyContract.networks[networkId];

        const instance = new web3.eth.Contract(
          McCoyContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
      instance.methods.ownerOf(1).call({from: accounts[0]}, (error, result) =>{
          console.log(error,"owner.." + result);
        });

  } catch(error){console.log('get owner address error', error)}
}//getOwnerAddress

getTokenByIndex = async(Q)=>{
    try{
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        console.log('update cards from ..',accounts[0]);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = McCoyContract.networks[networkId];

        const instance = new web3.eth.Contract(
          McCoyContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
      instance.methods.tokenByIndex(Q).call({from: accounts[0]}, (error, result) =>{
          console.log(error,"index.." + result);
        });

  } catch(error){console.log('token index error..', error)}

}//getTokenByIndes

getTokenMetaData = async(event)=>{
  try{
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        console.log('update cards from ..',accounts[0]);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = McCoyContract.networks[networkId];

        const instance = new web3.eth.Contract(
          McCoyContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
      instance.methods.tokenURI(1).call({from: accounts[0]}, (error, result) =>{
          console.log(error,"meta.." + result);
        });

  } catch(error){console.log('get token metadata error', error)}
}//getOwnerAddress

getTotalSupply= async(event)=>{
  try{
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        console.log('update cards from ..',accounts[0]);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = McCoyContract.networks[networkId];

        const instance = new web3.eth.Contract(
          McCoyContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        instance.methods.totalSupply().call({from: accounts[0]}, (error, result) =>
        {
         //had to add resutl.toString() - all of sudden got bigNumber errors in react
          const allTokens = result.toString(10);
          console.log(error, "totalSupply..."+ allTokens);
          this.setState({allTokens});

         console.log("totalSupply2.." + this.state.allTokens);
        });
  } catch(error){console.log('get token metadata error', error)}
}//getOwnerAddress

  render() {
    return(
  <Container>
  <h3> token list </h3>
   <Card.Group itemsPerRow={3}>
    <Card>
      <Card.Content>
        <Card.Header>Token Id 1</Card.Header>
        <Card.Meta>meta data of token</Card.Meta>
         <Card.Description>0xad9b86640008f02d9f2f3f0702133cea4eecb18c</Card.Description>
        <Card.Meta>Current Donor</Card.Meta>
      </Card.Content>
    </Card>

  </Card.Group>
  
  </Container>

)
  }
}

export default TokenCards
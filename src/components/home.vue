<template>
  <div class="home">
<!--    粒子背景-->
    <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
    >
    </vue-particles>
    <div class="content">
      <!--        链接部分-->
      <div class="home-top">
        <div class="home-top-content">
          <a target="_blank" href="https://mouse.mapscan.io" class="home-a">Mouse chain,ChainID:1000</a>
          <div class="home-get">
            <div class="home-get-text">faucet:</div>
            <input v-model="mouse" class="home-get-input">
            <button class="home-get-btn" @click="actionGetMouse()">获取</button>
          </div>
        </div>
        <div class="home-top-content">
          <a target="_blank" href="https://duck.mapscan.io" class="home-a">Duck chain,ChainID:1001</a>
          <div class="home-get">
            <div class="home-get-text">faucet:</div>
            <input v-model="duck" class="home-get-input">
            <button class="home-get-btn" @click="actionGetDuck()">获取</button>
          </div>
        </div>
      </div>
      <div class="home-line"></div>
      <!--        余额部分-->
      <div class="home-balance">
        <span class="home-balance-text">Your Balance：</span>
        <span class="home-balance-num">{{ walletBalance }} {{walletBalanceCion}} </span>

      </div>
<!--      个人地址-->
      <div class="home-balance">
        <span class="home-balance-text">Your Address：</span>
        <span class="home-balance-num"><span>{{ addressStr }}</span></span>
      </div>
      <!--        发送-->
      <div class="home-middle">
        <!--          send-->
        <div class="home-send">
          <div class="home-send-text">Send To :</div>
          <div>
            <div @click="showSend()" class="home-dropdown">
              <div style="margin-left: 20px">{{ selectname }}</div>
              <img src="../assets/arrow-bottom.png"/>
            </div>
            <!--              下拉框-->
            <div v-show="send==true" class="home-dropdown-send">
              <div>
                <div :class="selectname===item.name? 'home-select':'home-drop'"
                     @onmousemove="this.selectname==item.name" @click="updateSendname(item)" v-bind:key="index"
                     v-for="(item,index) in sendList">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--          asset-->
        <div class="home-send">
          <div class="home-send-text">Asset :</div>
          <div>
            <div @click="showAsste()" class="home-dropdown">
              <div style="margin-left: 20px">{{ selectSname }}</div>
              <img src="../assets/arrow-bottom.png"/>
            </div>
            <!--              下拉框-->
            <div v-show="asset==true" class="home-dropdown-send">
              <div>
                <div :class="selectSname===item.name? 'home-select':'home-drop'"
                     @onmousemove="this.selectSname==item.name" @click="updateAsstename(item)" v-bind:key="index"
                     v-for="(item,index) in sendSList">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!--        地址-->
      <div class="home-address">
        <div>Address：</div>
        <input v-model="addressSend" class="home-address-input">
      </div>
      <!--        amount-->
      <div class="home-address">
        <div>Amount：</div>
        <div class="home-address-content">
          <div class="home-amount">
            <input v-model="amount" type="number" class="home-amount-input">
            <!--            <div class="home-amount-arrow">-->
            <!--              <img @click="actionAdd()" style="margin-bottom: 5px" src="../assets/arrow-bottom2.png"/>-->
            <!--              <img @click="actionReduce()" src="../assets/arrow-top.png"/>-->
            <!--            </div>-->
          </div>
          <span @click.stop="actionMultiply()">Wei</span>
        </div>
      </div>
      <!--       交易-->
      <div class="home-btn">
        <button @click="actionAmount()">Transfer {{ amount }} Mos to Duck</button>
      </div>
    </div>
  </div>
</template>

<script>
import ('@/css/login.css')
import {checkEthereum} from '@/utils/tool'
const Web3 = require('web3') //引入web3
const web3 = new Web3(window.web3.currentProvider);
const contractJson = require('../abi/lock.json')
import BigNumber from 'bignumber.js'
//var Decimal = require('decimal'); //十进制 小数点
// const contractJsonReturn=require('../abi/token.json')
export default {
  name: 'HelloWorld',
  data() {
    return {
      mouse:'' ,//mouse
      duck:'',//duck
      addressSend: "",//对方账户
      walletBalance: 0,//账户余额
      addressStr: '',//我的账户地址
      send: false,//send下拉框显示
      asset: false,//asset下拉框显示
      selectSname: "Duck",
      amount: '',//输入金额
      walletBalanceCion:"MOS",//币种
      sendSList: [
        {
          name: "Duck",
        }, {
          name: "Mos"
        }
      ],
      selectname: "Duck",
      sendList: [
        {
          name: "Duck",
        }, {
          name: "Mos"
        }
      ]
    }
  },
  props: {
    msg: String
  },
  methods: {
    //mouse 获取
   async actionGetMouse() {
     console.log(1)
     let result = await this.$http.getBalance({chain:'mouse',address:this.mouse});
     console.log(result,'结果')
    },
    //duck 获取
   async actionGetDuck() {
      console.log(1)
      let result = await this.$http.getBalance({chain:'duck',address:this.duck});
      console.log(result,'结果')
    },
    //交易
    async actionAmount() {
      console.log(this.addressSend)
      //交易前判断
      if (this.addressSend == '' || this.amount == '') {
        return alert('输入框不能为空')
      } else {

        // 合约地址
        var contractAddress = "0x5221538292372CA706a62EB0D4890d2C85543bE9";

        // 账号
        var receiver_address = this.addressSend;

        // 定义锁币合约
        let myContract =await new web3.eth.Contract(contractJson, contractAddress);
        console.log(contractAddress,666666666)
        //mos链
        let chainID = await web3.eth.getChainId()
        // var value = this.amount;
        const value=new BigNumber(this.amount)
        console.log(`chainID`, chainID)
        if (chainID == '1000') {
          this.balance()
          // console.log(chainID,55555555)
          //本币的情况
          if (this.selectname=='Duck'&& this.selectSname=='Mos'){
            //调用合约锁币方法
            let lock = await myContract.methods.lock(receiver_address).encodeABI();
            // console.log(`lock`, lock, 222222)

            //发送锁币交易
            const sendTrans = await web3.eth.sendTransaction({
              from: this.addressStr,
              to: contractAddress,
              value: this.amount,
              data: lock,
              nonce: 1
            })
            console.log('sendTrans', sendTrans)
          }
          else {
            //调用赎回方法
            // console.log(88888888888888899999999999)
            let withdraw = await myContract.methods.withdraw(receiver_address, value).encodeABI()
            console.log('withdraw', withdraw)
            console.log(contractAddress, 99999999999)

            //定义赎回交易
            const sendTransReturn = await web3.eth.sendTransaction({
              from: this.addressStr,
              to: contractAddress,
              value: 0,
              data: withdraw,
              nonce: 1
            })
            console.log('sendTransReturn', sendTransReturn)
          }

        } else if(chainID==='1001') {
          this.balance()
          this.walletBalanceCion='DUC'
          console.log(this.walletBalanceCion,7777777777)
          //本币的情况
         if (this.selectname=='Mos'&&this.selectSname=='Duck'){
           //调用合约锁币方法
           let lock = await myContract.methods.lock(receiver_address).encodeABI();
           console.log(`lock`, lock, 222222)

           //发送锁币交易
           const sendTrans = await web3.eth.sendTransaction({
             from: this.addressStr,
             to: contractAddress,
             value: this.amount,
             data: lock,
             nonce: 1
           })
           console.log('sendTrans', sendTrans)
         }
         else{
           //调用赎回方法
           // var value = this.amount;
           console.log(value,'value')
           let withdraw = await myContract.methods.withdraw(receiver_address, value).encodeABI()
           console.log('withdraw', withdraw)
           console.log(contractAddress, 99999999999)

           //定义赎回交易
           const sendTransReturn = await web3.eth.sendTransaction({
             from: this.addressStr,
             to: contractAddress,
             value: 0,
             data: withdraw,
             nonce: 1
           })
           console.log('sendTransReturn', sendTransReturn)
         }

        }
        else {
          this.walletBalance=' ';
          this.walletBalanceCion='';
          this.addressStr=''
        }

      }
    },
    //wei单位乘
    actionMultiply() {
      this.amount = this.amount * 1000000000000000000
    },
    //调用
    async connectWallet() {
      console.log(web3.eth.getChainId())
      // console.log(this.addressSend, 88888)
      //检查是否注入web3
      const isInstalled = checkEthereum();
      console.log(isInstalled)
      // this.initPage();
      //获取余额
      //获得币种
      let chainID = await web3.eth.getChainId();
      if (chainID == '1000') {
        this.balance()
        this.walletBalanceCion='MOS'
        this.selectname='Duck'
      }else if (chainID=='1001') {
        this.balance()
        this.walletBalanceCion='DUC'
        this.selectname='Mos'
        this.selectSname='Mos'
      }else  {
        this.walletBalance=' ';
        this.walletBalanceCion='';
        this.addressStr=''
      }

    },
    //获取账户余额
    async balance(){
      //请求用户账号授权
      //返回一个Promise对象，其解析值为以太坊地址数组
      let addresses = await window.ethereum.enable();
      let address = addresses[0];
      this.addressStr = address;
      // console.log(this.walletBalance, 11111)
      var balance=await web3.eth.getBalance(address);
      this.walletBalance=balance/1000000000000000000
    },
    // 增加数量
    actionAdd() {
      console.log(this.amount)
      this.amount = parseInt(this.amount) + 1;
    },
    // 减少数量
    actionReduce() {
      console.log(this.amount)
      parseInt(this.amount)
      this.amount = parseInt(this.amount - 1);
      if (this.amount <= 0) {
        this.amount = 0
      }
    },
    // 展示下拉框
    showAsste() {
      this.asset = !this.asset
    },
    showSend() {
      this.send = !this.send
    },
    //下拉框
    updateAsstename(item) {
      this.asset = !this.asset
      console.log(1)
      console.log(item.name)
      this.selectSname = item.name
    },
    updateSendname(item) {
      this.send = !this.send
      console.log(1)
      console.log(item.name)
      this.selectname = item.name
    }
  },
  mounted() {
    this.connectWallet();
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
body {

}

.home {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #172029;
  color: white;
}

.content {
  height: 100%;
  padding: 65px;
}

.home-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .home-top-content {
    flex: 1;
  }
}

.home-a {
  font-size: 20px;
  font-family: Arial-BoldMT, Arial;
  font-weight: normal;
  color: #37A2F0;
  line-height: 23px;
}

.home-get {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 20px;

  .home-get-text {
    padding-right: 7px;
  }

  .home-get-input {
    outline-style: none;
    border: 0;
    color: white;
    width: 50%;
    height: 24px;
    background: #172029;
    border: 1px solid #2D7CB5;

  }

  .home-get-btn {
    border: 0;
    color: white;
    margin-left: 13px;
    width: 15%;
    height: 30px;
    background: #0C6CB2;
    outline-style: none;
    border: 0;
    //border: 5px #0C6CB2 solid;
    border-radius: 5px;
    cursor: pointer;
  }
}

.home-line {
  margin-top: 50px;
  width: 100%;
  height: 1px;
  border-top: 1px #11ADB1 dashed;
}

.home-middle {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
}

.home-balance {
  padding-top: 33px;

  .home-balance-text {
    font-size: 20px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #FFFFFF;
    line-height: 23px;
  }

  .home-balance-num {
    font-family: Arial-BoldMT, Arial;
    color: #77C3FB;
    font-size: 20px;
  }
}

.home-send {
  position: relative;
  flex: 1;
  padding-top: 32px;

  .home-send-text {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 20px;
  }

  .home-dropdown {
    font-family: Arial-ItalicMT, Arial;
    font-weight: normal;
    margin-top: 7px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    height: 34px;
    background: #172029;
    border: 1px solid #2D7CB5;

    img {
      width: 10px;
      height: 10px;
      margin-right: 20px;
    }
  }
}

.home-dropdown-send {
  position: absolute;
  //right: 0;
  z-index: 999;
  width: 80%;
  border: 1px solid #2D7CB5;
  font-family: Arial-ItalicMT, Arial;
  font-weight: normal;
}

.home-select {
  //position: absolute;
  padding-left: 20px;
  height: 34px;
  line-height: 34px;
  background: #638AB0;
}

.home-drop {
  padding-left: 20px;
  height: 34px;
  line-height: 34px;
  background: #172029;
}

.home-address {
  z-index: 1;
  position: relative;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  padding-top: 31px;

  .home-address-content {
    display: flex;
    flex-direction: row;
    align-items: center;

    span {
      cursor: pointer;
    }
  }

  .home-address-input {
    outline-style: none;
    border: 0;
    padding-left: 20px;
    padding-right: 20px;
    width: 80%;
    height: 34px;
    margin-top: 7px;
    color: white;
    background: #172029;
    border: 1px solid #2D7CB5;
  }
}

.home-amount {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  height: 34px;
  margin-top: 7px;
  padding-left: 20px;
  padding-right: 20px;
  margin-right: 20px;
  color: white;
  background: #172029;
  border: 1px solid #2D7CB5;

  .home-amount-input {
    width: 97%;
    height: 30px;
    background-color: #172029;
    outline-style: none;
    border: 0;
    color: white;
  }

  .home-amount-arrow {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    img {
      width: 10px;
      height: 5px;
    }
  }
}

.home-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 75px;

  button {
    outline-style: none;
    border: 0;
    color: white;
    width: 40%;
    height: 46px;
    background: #0C6CB2;
    border-radius: 5px;
    cursor: pointer;
  }
}

</style>

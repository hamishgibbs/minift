const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Token contract", function() {

  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function() {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();


    hardhatToken = await Token.deploy();

  })

  describe("Deployment", function () {

    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    })

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

  });

  describe("Transactions", function () {

    it("Should transfer tokens between accounts", async function () {
      await hardhatToken.transfer(addr1.address, 50);
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50)

      await hardhatToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);

    })

    it("Should fail if sender doesn't have enough tokens", async function () {

      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    })

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      await hardhatToken.transfer(addr1.address, 100);
      await hardhatToken.transfer(addr2.address, 50);

      const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);

    })

  })

  describe("Burning", function () {

    it("Should burn tokens and reduce total supply", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      const initialTotalSupply = await hardhatToken.totalSupply();

      await hardhatToken.burn(100);

      const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(100));

      const finalTotalSupply = await hardhatToken.totalSupply();
      expect(finalTotalSupply).to.equal(initialTotalSupply.sub(100));

    })

  })

  describe("Minting", function () {

    it("Should mint tokens and increase total supply", async function () {
      const initialAddr1Balance = await hardhatToken.balanceOf(addr1.address);
      const initialTotalSupply = await hardhatToken.totalSupply();

      await hardhatToken.mint(addr1.address, 100);

      const finalAddr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(finalAddr1Balance).to.equal(initialAddr1Balance.add(100));

      const finalTotalSupply = await hardhatToken.totalSupply();
      expect(finalTotalSupply).to.equal(initialTotalSupply.add(100));

    })

  })

});

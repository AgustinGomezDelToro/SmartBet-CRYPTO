require("@nomiclabs/hardhat-ethers");
require('dotenv').config();


module.exports = {
  solidity: "0.8.24",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/9eb78f13dc39478f8dc68f8ac3a571da`,
      accounts: [`0x${process.env.PRIVATE_KEY}`] // Asegúrate de reemplazar esto con tu clave privada
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/9eb78f13dc39478f8dc68f8ac3a571da`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};

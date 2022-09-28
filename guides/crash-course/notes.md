You can get information on your plotNFT:

:::warning
How do we create a plot NFT from the terminal, get an address for faucet, etc?
:::

```
chia plotnft show
```

List out plot NFTs with `chia plotnft show`. From here you can grab the launcher ID, which is used to identify your plot NFT, and get a pool login link like `chia plotnft get_login_link -l acd777a0d537e8e4e457e94ebb89ue158b984b8f9722f46cac67cb893e569510f`. Which by the way, you don’t want to share out this link to the world as it’s like a username and password for whatever pool you are using.

Another useful command is `chia farm summary` which is the equivalent of the Farming page in the GUI.

<details>
    <summary>Exercise: Create a plot</summary>
Let’s go through a quick CLI plotting example following [this documentation](https://github.com/Chia-Network/chia-blockchain/wiki/CLI-Commands-Reference#madmax) (or `chia plotters madmax -h`).

For this you will need your farmer public key and your pool contract address.

First, issue `chia keys show` to find your farmer public key. Next, use `chia plotnft show` to find the contract address.

The values will look something like:

`8914eed5ca5737ed6bb36225910d110cfc4d567115cfbb19cc19f600736aabf2a6709995aef9de37152d29f35ed9cdd6`

`xch1fafdg7w35l4ujyz4vcuj3k78s5gwj395gs8tszkfwjj40melx75scxgw8h`

The entire plotting command will look something like:

```
chia plotters madmax -k 32 -n 1 -r 7 -t temp -d . -f 8914eed5ca5737ed6bb36225910d110cfc4d567115cfbb19cc19f600736aabf2a6709995aef9de37152d29f35ed9cdd6 -c xch1fafdg7w35l4ujyz4vcuj3k78s5gwj395gs8tszkfwjj40melx75scxgw8h
```

where -n is the number of plots you want to create and `temp` is the name of a directory for temp files (create one with `mkdir temp`). `.` is the current directory for the destination.

These are just a few examples of how to use the CLI. But now that we have the CLI ready we can go through some additional steps to make sure our farm is set up properly and the plots we created are working.

</details>

## Chia Dev Tools and Environment

For the following Sections we suggest Atom or Visual Studio Code for the editor of choice. This is because they both currently have extensions to help you develop in Chialisp. For Atom, it is [language-chialisp](https://atom.io/packages/language-chialisp) and [Chialisp Language](https://marketplace.visualstudio.com/items?itemName=Rigidity.chialisplanguage) in VS Code.

You will also need to install Chia Dev Tools. To do this, you'll first need Python installed. For this we will first create a directory for our project and virtual environment, then install `chia-dev-tools` inside of the virtual environment.

```
mkdir chialisp
cd chialisp
python3 -m venv .venv
. .venv/bin/activate
pip install chia-dev-tools
```

This includes CLVM tools, which will include commands like `run` and `brun`. It will also install a version of the Chia blockchain so we should have access to various Chia commands.

```
brun --help
```

```
cdv --help
```

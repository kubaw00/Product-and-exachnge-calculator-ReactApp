
// const Dollars = (props) =>{
//     const value = (props.cash/props.ratio).toFixed(2)
//     return(
//     <div>Wartość w Dolarach: {props.cash <= 0 ? "" : value}</div>
//     )
// }
// const Euros = (props) => {
//     const value = (props.cash/props.ratio).toFixed(2)
//     return(
//     <div>Wartość w Euro: {props.cash <= 0 ? "" : value}</div>
//     )
// }

//Jeden komponent funkcyjny, bezstanowy:
const Cash = (props) => {
    const value = (props.cash/props.ratio *props.price).toFixed(2)
    return(
    <div>{props.title}{props.cash <= 0 ? "" : value}</div>
    )
}



class ExchangeCounter extends React.Component {

    state ={
        amount: "",
        // ratioDollar: 3.9,
        // ratioEuro: 4.5,
        product: "gas"
    }

    static defaultProps = {
        currencies: [
            {
                id: 0,
                name: "zloty",
                ratio: 1,
                title: 'Wartość w złotówkach: '
            },
            {
                id: 1,
                name: "dollar",
                ratio: 3.9,
                title: 'Wartość w dolarach: '
            },
            {
                id: 2,
                name: "euro",
                ratio: 4.5,
                title: 'Wartość w euro: '
            },
            {
                id: 3,
                name: "pound",
                ratio: 4.6,
                title: 'Wartość w funtach: '
            },
            
        ],
        prices: {
            electricity: .51,
            gas: 4.76,
            oranges: 3.5
        } 
    }
    

    
handleChange = (e) => {
    this.setState({
        amount: e.target.value
    })
}

handleSelect = (e) => {
    this.setState({
        product: e.target.value,
        amount: ""
    })
}

selectPrice = (select) => {
  return this.props.prices[select]
}


insertSuffix = (select) => {
    if(select === "electricity"){
        return <em> kWh</em>
    } else if (select === "gas"){
        return <em> litrów</em>
    } else if (select === "oranges"){
        return <em> kg</em>
    } else return "---"
}

  render(){
        const {amount, product} = this.state;
        const {currencies} = this.props;
        const price = this.selectPrice(product)
        const calculator = currencies.map(currency => (
            <Cash key={currency.id} name={currency.name} ratio={currency.ratio} title={currency.title} cash ={amount} price={price} />
        ))




        return(
            <div>
                <label>Wybierz produkt:
                    <select value={product} onChange={this.handleSelect}>
                        <option value="electricity">prąd</option>
                        <option value="gas">benzyna</option>
                        <option value="oranges">pomarańcze</option>
                    </select>
                </label>
                <label>
                    <input 
                    type="number" 
                    value={amount}
                    onChange={this.handleChange}/>
                    {this.insertSuffix(product)}
                </label>
                {/* <Dollars cash={amount} ratio={ratioDollar}/>
                <Euros cash={amount} ratio={ratioEuro}/> */}
                {/* <Cash title="Wartość w euro: " cash={amount} ratio={ratioEuro}/>
                <Cash title="Wartość w dolarach: " cash={amount} ratio={ratioDollar}/> */}
                {calculator}

            </div>
        )

    }
}

ReactDOM.render(<ExchangeCounter />, document.getElementById('root'))
import React, { Component } from 'react';


class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : false,
            products : [],
            input: ""
        };
    }
    fetchProducData(){
        this.setState({
            isLoaded: false,
            products: ""
        });
        if (this.state.input) {
            fetch('http://localhost:3035/search', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "query": {
                        "query_string": {
                            "query": this.state.input + "*",
                            "fields": ["name", "about", "tags", "price"]
                        }
                    }
                })
            })
                .then(response => response.json())
                .then(
                    // handle the result
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            products: result
                        });
                    },
                    // Handle error
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        })
                    },
                )
        }
    }

    componentWillReceiveProps(nextProps){
        if (this.props.input!=nextProps.input) {
            this.state.input = nextProps.input;
            this.fetchProducData();
        }
    }

    render() {
        const {error, isLoaded, products} = this.state;
        if(error){
            return <div>Error in loading</div>
        }else if (!isLoaded) {
            return <div></div>
        }else{
            var _data = products.hits.hits;
            return(
                <div>
                    <ol>
                        {
                            _data.map(product => (
                                <li>
                                     <div>
                                        <img src={product._source.picture}  width="30" height="30"/>
                                    </div>
                                    <div>
                                        <p>{product._source.name}</p>
                                    </div>


                                </li>
                            ))
                        }
                    </ol>
                </div>
            );
        }

    }
}

export default Product;
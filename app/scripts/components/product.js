import React, { Component } from 'react';


class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : false,
            products : []
        };
    }
    componentDidMount(){
        fetch('http://localhost:3035/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "query": {
                    "query_string": {
                        "query": "*",
                        "fields": ["name", "about", "tags", "price"]
                    }
                }
            })
        })
            .then( response => response.json())
            .then(
                // handle the result
                (result) => {
                    this.setState({
                        isLoaded : true,
                        products : result
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
    render() {
        const {error, isLoaded, products} = this.state;
        if(error){
            return <div>Error in loading</div>
        }else if (!isLoaded) {
            return <div>Loading ...</div>
        }else{
            var _data = products.hits.hits;
            console.log(_data);
            return(
                <div>
                    <ol>
                        {
                            _data.map(product => (
                                <li key={product.id} align="start">
                                    <div>
                                        <p>{product.name}</p>
                                        <p>{product.about}</p>
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
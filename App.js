import React, {Component} from "react";
import {
    View,
    Text,
    Dimensions,
    FlatList,
    ActivityIndicator,
    ToastAndroid,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import SplashScreen from 'react-native-splash-screen';
import { productsPath, sortByProducts} from "./src/Api/Urls";
import ProgressBar from "./src/Components/ProgressBar";
import ListItem from "./src/Components/ListItem";
import Header from "./src/Components/Header";
import colors from "./src/Components/colors";
import Container from "./src/Components/Container";
import LoadMoreBtn from "./src/Components/LoadMoreBtn";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {sortByAscendingOrder} from "./src/Utils/SortDate";

const {width, height} = Dimensions.get("window");

export default class App extends Component {

    state = {
        products: [],
        sortBy: '',
        page: 1,
        limit: 15,
        loading: false,
        loadMore: false,
        listEnd: false,
        isShowAd: false
    };

    componentDidMount() {

        SplashScreen.hide();

        this.setState({loading: true}, this._loadProducts);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // this will prevent unwanted render. copare currentState & nextState and retrun true/false based on them.
        const stateChanged =
            JSON.stringify(this.state) != JSON.stringify(nextState);

        return stateChanged;
    }

    // load products from network
    _loadProducts = () => {
        const {page, limit, loadMore, loading, listEnd, products} = this.state;


        if (!loadMore && !listEnd) {
            this.setState({loadMore: true}, async () => {
                let response = await fetch(productsPath(page, limit));
                let responseJson = await response.json();


                if (!loading) {
                    ToastAndroid.show(`load more page ${page}`, ToastAndroid.SHORT)
                }
                if (responseJson.length > 0) {
                    // console.log('products.length', products.length);
                    // if (products.length === 20) {
                    //     this.setState({ isShowAd: true });
                    // }
                    this.setState({
                        loading: false,
                        loadMore: false,
                        page: page + 1,
                        products: [...products, ...responseJson]
                    });
                } else {
                    ToastAndroid.show(`No more data found`, ToastAndroid.SHORT);
                    this.setState({
                        loading: false,
                        loadMore: false,
                        listEnd: true
                    });
                }
            });
        }
    };

    // Product list sorted by size, price, id
    handleSorting = (sortItemValue) => {
        const {page, limit} = this.state;
        this.setState({sortBy: sortItemValue});

        this.setState({loading: true});
        try {
            fetch(productsPath(page, limit, sortItemValue)).then(response => response.json())
                .then(response => {
                    this.setState(prevState => {
                        prevState.loading = false;
                        let products = response;
                        if (sortItemValue === 'ascending') {
                            sortByAscendingOrder(products);
                        }
                        return { products };
                    });
                });
        } catch (e) {
            // if any network issue
            console.log('error:', e);
            this.setState({loading: false});
        }
    };

    _renderFooter = () => {
        return this.state.listEnd ? null : (
            <Container>
                <TouchableOpacity activeOpacity={0.8}
                                  onPress={this._loadProducts}
                                  style={styles.loadMore}

                >
                    <Text style={{color: '#fff'}}>Load more...</Text>
                    {this.state.loadMore ?
                        <ActivityIndicator size="small" color={colors.primary}/>
                        : null
                    }
                </TouchableOpacity>

            </Container>
        );
    };

    // renderFooter = () => (
    //     <Container>
    //         {/*{this.state.loadMore ?*/}
    //             <ActivityIndicator size="large" animating color={colors.primary}/>
    //             {/*: null*/}
    //         {/*}*/}
    //     </Container>
    // );


    _listEmpty = () => (
        <Container>
            <Text>~ end of catalogue ~</Text>
        </Container>
    );


    renderItem = ({item}) => <ListItem item={item} isShowAd={this.state.isShowAd} />;

    render() {

        // console.log('this.state.products----::',this.state.products);

        return (
            <View style={{flex: 1}}>
                <Header sortBy={this.state.sortBy} sortingHandler={this.handleSorting}/>
                {this.state.loading ? <ProgressBar/> :
                    <FlatList
                        data={this.state.products}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                        // onEndReached={this._loadProducts}
                        // onEndReachedThreshold={0.5}
                        ListEmptyComponent={this._listEmpty}
                        ListFooterComponent={this._renderFooter}
                    />
                }
            </View>

        );
    }


}

const styles = StyleSheet.create({
    loadMore: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
    },
});



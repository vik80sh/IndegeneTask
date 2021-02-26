import React, { Component } from 'react'
import axios from 'axios'

import BasicButton from '../../atoms/basicButton/Button'
import BasicInput from '../../atoms/basicInput/BasicInput'
import { API } from './../../constant'
import './home.css'
import Popup from '../popup/popup'
export default class Home extends Component {
    state = {
        year: "",
        movieName: "",
        movieList: [],
        page: 0,
        totalResults: 0,
        message: "",
        isPopUpOpen: false,
        movieInfo: ""
    }
    onChangeHandler = (e) => {
        let value = e.target.value;
        let testRegex = /^[0-9]*$/
        if (!testRegex.test(value) && e.target.name === "year")
            return;
        this.setState({ [e.target.name]: value })
    }
    clickHandler = (e, isTrue) => {
        let url = API.movieSearch + "&s=" + this.state.movieName;
        let list = this.state.movieList;

        if (this.state.year || isTrue) {
            list = []
            url = url + "&y=" + this.state.year;
        }
        else {
            let page = this.state.page + 1;
            url = url + "&page=" + page;
            this.setState({ page: page })
        }
        axios.get(url)
            .then(res => {
                let result = res.data
                console.log("  = = werewr= = =", res)
                if (result.Response === "True")
                    this.setState({
                        movieList: [...list, ...result.Search],
                        totalResults: result.totalResults, message: ""
                    })
                else
                    this.setState({
                        movieList: [],
                        totalResults: 0,
                        totalResults: result.totalResults, message: result.Error
                    })
            })
            .catch(err => console.log(" err =   ", err))
    }
    openPopup = (data) => {
        let url = API.movieSearch + "&i=" + data + "&plot=full";
        axios.get(url)
            .then(res => {
                let result = res.data;
                console.log(" --- result- - -",result)
                this.setState({movieInfo:result,isPopUpOpen:true})
            })
            .catch(err => console.log(" err =   ", err))

    }
    openPopupToggle=()=>{
        this.setState({isPopUpOpen:false})
    }
    render() {
        let { movieList, year, totalResults, message, isPopUpOpen,movieInfo } = this.state;
        return (
            <div className="home-wrapper">
                <div className="input-handler">
                    <BasicInput
                        type="text"
                        name="year"
                        placeholder="Release Year"
                        value={this.state.year}
                        onChange={this.onChangeHandler} />
                    <BasicInput
                        type="text"
                        name="movieName"
                        placeholder="Movie Name"
                        value={this.state.movieName}
                        onChange={this.onChangeHandler} />
                    <BasicButton text="Search" onClick={(e) => this.clickHandler(e, true)} />
                </div>
                <div className="home-body">
                    {
                        movieList.length > 0 ? movieList.map((data, index) => {
                            return <div className="card movie-list" onClick={() => this.openPopup(data.imdbID)}>
                                <div className="title">
                                    Title : {data.Title}
                                </div>
                                <div className="year">
                                    Year : {data.Year}
                                </div>
                            </div>
                        }) : <div className="search-movie">{message ? message : "Please Search Movie"} </div>
                    }
                </div>

                {!year && movieList.length < totalResults && <div className="load-more"><BasicButton text="Load More" onClick={(e) => this.clickHandler(e, false)} /></div>}
                {isPopUpOpen && <Popup handleClose={this.openPopupToggle} data={movieInfo} isPopup={true}/>}
            </div>
        )
    }
}

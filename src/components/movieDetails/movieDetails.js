import React, { Component } from 'react'
import axios from 'axios'

import BasicButton from '../../atoms/basicButton/Button'
import BasicInput from '../../atoms/basicInput/BasicInput'
import { API } from './../../constant'
import './movieDetails.css'
import Popup from '../popup/popup'
export default class MovieDetails extends Component {
    state = {
        year: "",
        movieName: "",
        movieList:[]
    }
    onChangeHandler = (e) => {
        let value = e.target.value;
        let testRegex = /^[0-9]*$/
        if (!testRegex.test(value) && e.target.name === "year")
            return;
        this.setState({ [e.target.name]: value })
    }
    clickHandler = () => {
        let url = API.movieSearch + "&s=" + this.state.movieName;
        let list = this.state.movieList;

        if (this.state.year) {
            list = []
            url = url + "&y=" + this.state.year;
        }
        axios.get(url)
            .then(res => {
                let result = res.data
                console.log("  = res.data = =", res)
                if (result.Response === "True")
                    this.setState({
                        movieList: [...list, ...result.Search], message: ""
                    })
                else
                    this.setState({
                        movieList: [], message: result.Error
                    })
            })
            .catch(err => console.log(" err =   ", err))
    }


    render() {
        let { movieList, message } = this.state;
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
                    <BasicButton text="Search" onClick={this.clickHandler} />
                </div>
                <div className="movie-body">
                    {
                        movieList.length > 0 ? movieList.map((data, index) => {
                            return <div className="card">
                                <figure>
                                    <img src={data.Poster} alt="poster" />
                                    <figcaption><b>{data.Title}</b></figcaption>
                                </figure>
                                <p>Release Year : {data.Year}</p>
                            </div>
                        }) : <div className="search-movie">{message ? message : "Please Search Movie"} </div>
                    }
                </div>
            </div>
        )
    }
}

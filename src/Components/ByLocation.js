import React from 'react';
import './Style/ByLocation.scss';
class ByLocation extends React.Component {


    onInputLatChange(e) {
        this.props.onInputLatChange(e);
    }
    onInputLonChange(e) {
        this.props.onInputLonChange(e);
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.props.onLocationFormSubmit();
    }
    render() {
        const lat = this.props.lat
        const lon = this.props.lon

        return (
            <form className="by-location" onSubmit={e => this.onFormSubmit(e)} >
                <button className="by-location__button" type="submit">
                    Search
                </button>
                <div className="by-location__input">
                    <input
                        autoComplete="off"
                        className="by-location__input_lat"
                        id="lat"
                        name="lat"
                        value={lat}
                        onChange={e => this.onInputLatChange(e)}
                        placeholder="Latitude..."
                    />
                    <input
                        className="by-location__input_lon"
                        id="lon"
                        name="lon"
                        value={lon}
                        onChange={e => this.onInputLonChange(e)}
                        placeholder="Longitude..."
                    />
                </div>
            </form>
        )
    }
}
export default ByLocation;
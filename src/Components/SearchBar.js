import React from 'react';
import './Style/SearchBar.scss';
class SearchBar extends React.Component {


    onInputChange(e) {
        this.props.onInputChange(e);
    }
    onFormSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit();
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.location !== nextProps.location) {
          return true;
        }
        return false;
      }
    render() {
        const location = this.props.location;
        
        return (
            <form className="search-bar" onSubmit={e => this.onFormSubmit(e)} >
                <button className="search-bar__button" type="submit">
                    Search
                </button>
                <input
                    autoComplete="off"
                    className="search-bar__input"
                    id="search"
                    name="search"
                    value={location}
                    onChange={e => this.onInputChange(e)}
                    placeholder="City..."
                />
            </form>
        )
    }
}
export default SearchBar;
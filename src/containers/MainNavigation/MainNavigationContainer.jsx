import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, MenuItem } from 'components';

const MainNavigationContainer = ({navigation}) => {
    return(
        <nav>
            <Menu>
                {navigation.map((item) => {
                    const {id, name, url} = item;
                    return (
                        <MenuItem key={id}>
                            <NavLink to={url}>{name}</NavLink>
                        </MenuItem>
                    )
                })}
            </Menu>
        </nav>
    )
};

const mapStateToProps = ({navigation}) => {
    // console.log(props);
    return {
        navigation
    }
}

export default connect(mapStateToProps)(MainNavigationContainer);
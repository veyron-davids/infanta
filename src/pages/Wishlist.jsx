import React from 'react'
import { Route } from "react-router-dom";
import WishlistMobile from "../mobile/pages/Wishlist";
import ProtectedRoute from '../services/protectedRoute';


const Wishlist = () => {
    return (
      <React.Fragment>
        <ProtectedRoute path="/wishlist" component={WishlistMobile} />
      </React.Fragment>
    );
}

export default Wishlist

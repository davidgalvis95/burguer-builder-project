import BurguerIngredient from "./BurguerIngredient/BurguerIngredient";
import classes from './Burguer.module.css'

const burguer = (props) => {

    return (
        <div className={classes.Burguer}>
            <BurguerIngredient type="bread-top"/>
            <BurguerIngredient type="cheese"/>
            <BurguerIngredient type="salad"/>
            <BurguerIngredient type="meat"/>
            <BurguerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burguer;
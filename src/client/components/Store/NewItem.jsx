import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';
import { RaisedButton, MenuItem, Snackbar } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsySelect, FormsyText, FormsyToggle } from 'formsy-material-ui/lib';
import { doCategoryReq } from '../../redux/actions/store/category';
import { doItemCreate } from '../../redux/actions/store/new_item';

const mainStyle = { width: '100%', padding: 0 };

const spinnerStyle = { margin: 'auto', display: 'block', padding: 5 };

class NewItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
    };
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(doCategoryReq());
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  handleSnackbarRequestClose(reason) {
    if (reason !== 'clickaway' && !this.props.newItem.error) {
      window.location.reload();
    }
  }

  handleSubmit(data) {
    this.props.dispatch(doItemCreate(data));
  }

  renderNewItemForm() {
    return (
      <div style={{ width: '300px', margin: '200px auto' }}>
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.handleSubmit}
        >
          <FormsyText
            hintText="Item name"
            name="name"
            requiredError="This field is required"
            required
            fullWidth
          />
          <FormsySelect
            name="category"
            floatingLabelText="Category"
            fullWidth
            required
          >
            {this.props.categories.categories.map(item => (
              <MenuItem key={item._id} value={item._id} primaryText={item.name} />
            ))}
          </FormsySelect>
          <br />
          <FormsyText
            name="price"
            hintText="Price"
            validations="isNumeric"
            validationError="Please provide a number"
            fullWidth
            required
          />
          <FormsySelect
            name="currency"
            floatingLabelText="Currency"
            required
            fullWidth
          >
            <MenuItem value="USD" primaryText="USD" />
            <MenuItem value="BTC" primaryText="BTC" />
          </FormsySelect>
          <FormsySelect
            name="paymentOptions"
            floatingLabelText="Payment"
            required
            fullWidth
          >
            <MenuItem value="Paypal" primaryText="Paypal" />
            <MenuItem value="Credit Card" primaryText="Credit Card" />
            <MenuItem value="Bitcoin" primaryText="Bitcoin" />
          </FormsySelect>
          <FormsyToggle
            name="certificate"
            label="Certificate"
          />
          <FormsyText
            name="itemDescription"
            hintText="Description"
            multiLine
            fullWidth
            required
          />
          {!this.props.newItem.loading &&
            <RaisedButton
              label="Send"
              type="submit"
              primary={false}
              fullWidth
              disabled={!this.state.canSubmit}
            />}
        </Formsy.Form>
        {this.props.newItem.loading &&
          !this.props.newItem.success &&
          <CircularProgress size={50} style={spinnerStyle} />}
        <Snackbar
          open={this.props.newItem.success}
          message="Success! Item created."
          autoHideDuration={2000}
          onRequestClose={this.handleSnackbarRequestClose}
        />
        <Snackbar
          open={this.props.newItem.error || false}
          message={this.props.newItem.message}
          autoHideDuration={2000}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="container" style={mainStyle}>
        {this.renderNewItemForm()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const categories = state.categories;
  const newItem = state.newItem;

  return { categories, newItem };
}

export default connect(mapStateToProps)(NewItem);


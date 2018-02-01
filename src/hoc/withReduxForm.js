import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, reset, getFormValues, submit } from 'redux-form';
import { FORMAT_TO_REDUX_FORM } from '../queryFormatter';
import { PARSE_FROM_REDUX_FORM } from '../queryParser';

const mapStateToProps = (state, { name, queryFormatter }) => {
    const itemsFilterState = state.itemsFilter[name];
    return {
        initialValues: queryFormatter(itemsFilterState.currentQuery, {type: FORMAT_TO_REDUX_FORM}),
        formValues: getFormValues(name)(state),
        form: name
    };
};

const mapDispatchToProps = (dispatch, { resetQuery }) => {
    return {
        resetForm: () => {
            dispatch(reset(name));
            resetQuery(); // is wrapped with dispatch
        }
    };
};

function withReduxForm(WrappedComponent) {
    const EnhancedWithForm = reduxForm({
        enableReinitialize: true,
        onSubmit: (values, dispatch, props) => {
            props.setQuery(props.queryParser(values, {type: PARSE_FROM_REDUX_FORM}));
        },
        onChange: (values, dispatch, props, /* ,previousValues */) => {
            // trigger submit immediately after form change
            setTimeout(() => {
                dispatch(submit(props.name));
            }, 0);
        }
    })(WrappedComponent);
    EnhancedWithForm.propTypes = {
        name: PropTypes.string.isRequired,
        queryParser: PropTypes.func.isRequired,
        setQuery: PropTypes.func.isRequired
    };
    const WithReduxForm = connect(mapStateToProps, mapDispatchToProps)(EnhancedWithForm);
    WithReduxForm.propTypes = {
        name: PropTypes.string.isRequired,
        queryFormatter: PropTypes.func.isRequired,
        resetQuery: PropTypes.func.isRequired
    };
    return WithReduxForm;
}

export default withReduxForm;


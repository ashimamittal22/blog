import React, { Component } from 'react';
import deepClone from 'lodash/cloneDeep';
import axios from '../../axios-blog';
import { Redirect } from 'react-router';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import styles from './NewArticle.module.css';
import Button from '../../components/UI/Button/Button';
import { updateObject, checkValidity } from '../../shared/utility';

class NewArticle extends Component {
    state = {
        controls: {
            title: {
                label: "Title",
                elementType: 'input',
                elementConfig: {
                    required: true,
                    type: 'text',
                    placeholder: 'Title'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            description: {
                label: "Description",
                elementType: 'input',
                elementConfig: {
                    required: true,
                    type: 'text',
                    placeholder: "What is the article about?"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            content: {
                label: "Content",
                elementType: 'textarea',
                elementConfig: {
                    required: true,
                    rows: '4',
                    type: 'text',
                    placeholder: "Write your article here..."
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        slug: null,
        error: null,
        loading: false,
        submitted: false
    }

    componentDidMount() {
        let controls = deepClone(this.state.controls);
        if (this.props.match?.params?.slug) {
            axios.get('/articles/' + this.props.match.params.slug)
                .then(response => {
                    console.log(response.data.article);
                    let article = response.data.article;
                    controls.title.value = article.title;
                    controls.description.value = article.description;
                    controls.content.value = article.body;
                    this.setState({
                        controls: controls,
                        slug: this.props.match?.params?.slug
                    });
                });
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({ controls: updatedControls });
    }

    postDataHandler = () => {
        const data = {
            article: {
                title: this.state.controls.title.value,
                description: this.state.controls.description.value,
                body: this.state.controls.content.value,
                tagList: []
            }
        }
        const header = {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        };
        this.setState({
            loading: true
        });
        if (this.state.slug) {
            axios.put('/articles/' + this.state.slug, data, header)
                .then(response => {
                    this.setState({
                        submitted: true,
                        loading: false,
                        error: false
                    });
                }).catch(e => {
                    this.setState({
                        submitted: false,
                        loading: false,
                        error: e
                    });
                });
        }
        else {
            axios.post('/articles', data, header)
                .then(response => {
                    this.setState({
                        submitted: true,
                        loading: false,
                        error: false
                    });
                }).catch(e => {
                    this.setState({
                        submitted: false,
                        loading: false,
                        error: e
                    });
                });
        }
    }

    render() {
        let redirect = null;
        if (this.state.submitted) redirect = <Redirect to='/articles' />;

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement => (
            <Input
                label={formElement.config.label}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        if (this.state.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.state.error) {
            errorMessage = (
                <p>{this.state.error.message}</p>
            );
        }

        return (
            <div className={styles.NewArticle}>
                {redirect}
                {errorMessage}
                <form onSubmit={this.postDataHandler}>
                    {form}
                    <Button btnType="Success">Publish</Button>
                </form>
            </div>
        );
    }
}

export default NewArticle;
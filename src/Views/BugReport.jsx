import React from "react";
import styles from './Login.module.css';
import { useForm } from "@formspree/react";
import {Link} from 'react-router-dom';
import {ImSpinner8} from 'react-icons/im';

export default function BugReport() {
    const [state, handleSubmit] = useForm("xbjqydgl");

    if (state.succeeded) {
        console.log('state of form: ', state);

        return(
            <div className="displayFlex flexCol itemsCenter justifyCenter pt24">
                <p className="textGray3 text2Xl mb8">{"<(^,^)>"}</p>
                <h3 className='textLg mb2'>Your bug report was submitted!</h3>
                <p className="textGray4 mb6">Thank you for taking time and submitting a bug report.</p>
                <Link to="/" className="textMd">Go Home</Link>
            </div>
        )
    }

    return (
        <div className="md:pl4">
            <h3 className="textMd md:textLg mb1">Bug Report</h3>
            <p className="textGray4 textSm mb6">
                Use this form to send the bug report. Please make
                it as detailed as possible.
            </p>
            <div className="displayGrid gridCols2">
                <form onSubmit={handleSubmit} className={"gridColSpan2 md:gridColSpan1 bgGray1 rounded p4 border borderGray2 mb12"}>
                    
                    <div className={"displayFlex flexCol mb6"}>
                        <label htmlFor="name" className="textSm textGray4 mb1">Name <small>(Optional)</small></label>
                        <input id="name" type="text" name="name" placeholder="Your name" className={styles.form_input}/>
                    </div>

                    <div className={"displayFlex flexCol mb6"}>
                        <label className="textSm textGray4 mb1">Did this bug lead to app crash?</label>
                        <div className="displayFlex itemsCenter">
                            <label className="displayFlex itemsCenter mr8">
                                <input type="radio" id="appcrash_yes" name="app_crashed" value="Yes" className="mr2" required />
                                Yes
                            </label>
                            <label className="displayFlex itemsCenter">
                                <input type="radio" id="appcrash_yes" name="app_crashed" value="No" className="mr2" required />
                                No
                            </label>
                        </div>
                    </div>

                    <div className="displayFlex flexCol mb4">
                    <label htmlFor="message" className="textSm textGray4 mb1">Describe the bug</label>
                        <textarea id="message" name="message" rows="5"  className={styles.form_input} required
                                placeholder="It would help if you can provide steps to recreate the bug." />
                    </div>
                    
                    <div className="mb4">
                        <button type="submit" disabled={state.submitting} className="borderNone bgBlue4 hover:bgBlue5 textWhite pl4 pr4 pt2 pb2 rounded">
                            {
                                state.submitting ? 
                                <div><ImSpinner8 className="loadingIcon" /> Submitting</div>
                                :
                                "Submit"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}

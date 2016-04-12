import React from "react";
import Radium from "radium";
import _ from "lodash";
import Flex from "../framework/flex";
// import { connect } from "react-redux";
// import { FOO } from "../actions";
import Comment from "./summary-comment";


// @connect(state => {
//   return state.FOO;
// })
@Radium
class SummaryConsensus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static propTypes = {
    /* react */
    // dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    routes: React.PropTypes.array,
    /* component api */
    style: React.PropTypes.object,
    // foo: React.PropTypes.string
  }
  static defaultProps = {
    // foo: "bar"
  }
  getStyles() {
    return {
      base: {

      },
      sectionHeader: {
        fontWeight: 500,
        fontSize: 24
      },
      text: {
        fontWeight: 300,
        maxWidth: 600
      },
      mostAgreedUpon: {
        backgroundColor: "rgb(46, 204, 113)",
        padding: "3px 6px",
        borderRadius: 3,
        color: "white"
      },
      mostDisgreedUpon: {
        backgroundColor: "rgb(231, 76, 60)",
        padding: "3px 6px",
        borderRadius: 3,
        color: "white",
      }
    };
  }
  getConsensusAgreeComments() {
    const comments = this.props.comments.comments;
    const math = this.props.math.math;
    const styles = this.getStyles();
    return math.consensus.agree.map((comment, i) => {
      return (
        <Comment
          key={i}
          majority={true}
          agree={true}
          first={i === 0 ? true : false}
          {...comment}
          {...comments[comment.tid]} />
      );
    });
  }
  getConsensusDisagreeComments() {
    const comments = this.props.comments.comments;
    const math = this.props.math.math;
    const styles = this.getStyles();
    return math.consensus.disagree.map((comment, i) => {
      return (
        <Comment
          key={i}
          majority={true}
          {...comment}
          {...comments[comment.tid]} />
      );
    });
  }
  render() {
    const comments = this.props.comments.comments;
    const math = this.props.math.math;
    const styles = this.getStyles();
    return (
      <span style={styles.text}>
        <p style={styles.sectionHeader}> The General Consensus </p>
        <span>
          Across all {math["n"]} participants,
          the <span style={styles.mostAgreedUpon}>most agreed</span> upon
          {math.consensus.agree.length > 1 ? " comments were: " : "comment was: "}
        </span>
        {this.getConsensusAgreeComments()}
        <span>
          {` The `}
          <span style={styles.mostDisgreedUpon}>most disagreed</span>
          {` upon `}
          {math.consensus.disagree.length > 1 ? " comments were: " : "comment was: "}
        </span>
        {this.getConsensusDisagreeComments()}
      </span>
    );
  }
}

export default SummaryConsensus;

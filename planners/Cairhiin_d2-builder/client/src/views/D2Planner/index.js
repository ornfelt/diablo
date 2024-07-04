import React, { Component } from 'react';
import { Stack, Box } from "@chakra-ui/react";
import D2PLANNER_LAYOUT from './Data/layout';
import Tooltip from './Tooltip';
import SkillList from './SkillList';
import ScoreList from './ScoreList';
import {
  checkPrerequisites,
  checkDownTreePoints,
  getSkillInfo
} from './Utilities';
import { CLASS_SKILL_DATA } from './Data';
import CreateLink from './CreateLink';
import './D2Planner.css';

const TOTAL_SKILLPOINTS = 110;

class D2Planner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...D2PLANNER_LAYOUT,
      skillpoints: TOTAL_SKILLPOINTS,
      activeTooltipData: [],
      activeTooltipDepencies: [],
      toolTipIsActive: false,
      toolTipStyle: null
     };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }
  
  componentDidMount() {
    /* Getting skill point data from URL */
    const { skillPoints } = this.props;
    let availablePoints = 110;
    if (skillPoints.length > 0) {
      let i=0;
      for (let key in D2PLANNER_LAYOUT) {
        if (typeof skillPoints[i] !== "undefined" ) {
          let val = parseInt(skillPoints[i]);
          if (val < 0) val = 0;
          if (val > 20) val = 20;
          availablePoints -= val;
          this.setState({ [key]: val })
        } else {
          this.setState({ [key]: 0 })
        }
        i++;
        this.setState({ skillpoints: availablePoints })
      }
    }
  }

  handleMouseEnter = (e, id, className) => {
    const el = document.getElementById(id);
    const map = document.getElementsByClassName("skilltree");
    const mapNumber = id.slice(1,2);
    const posX = map[mapNumber-1].getBoundingClientRect().x;
    const posY = map[mapNumber-1].getBoundingClientRect().y;
    const coords = el.coords.split(", ");

    this.setState(prevState => {
      const skillinfo = getSkillInfo(CLASS_SKILL_DATA[className], id);
      const dependencies = skillinfo[0].dependencies;
      let dep = [];
      if (typeof dependencies !== 'undefined') {
        for (let i=0; i<dependencies.length; i++) {
          if (dependencies[i].id in this.state) {
              dep.push(this.state[dependencies[i].id]);
          }
        }
      }

      let toolTipStyle = Object.assign({}, prevState.toolTipStyle);
      toolTipStyle.left = `${parseInt(coords[2]) + posX - 50}px`;
      toolTipStyle.top = `${parseInt(coords[3]) + posY + window.scrollY + 50}px`;

      return {
        toolTipStyle,
        toolTipIsActive: true,
        activeTooltipData: skillinfo,
        activeTooltipDepencies: dep,
        activeTooltipId: id,
      };
    });
  }

  handleMouseLeave = () => {
    this.setState({toolTipIsActive: false, activeTooltipData: []});
  }

  handleClick = (e, skillTree) => {
    e.stopPropagation();
    if (typeof e.target.id !== 'undefined' && e.target.id !== '') {
      const key = e.target.id;

      // get skill's column and row
      const r = key.slice(3, 4);
      const c = key.slice(5, 6);
      let skillValueChange = 1;
      const value = this.state[key] || 0;
      const availablePoints = this.state.skillpoints;

      if (e.nativeEvent.which === 3) {
        e.preventDefault();
        // get the skill's downtree points and check if they are not > 0
        let hasDownTreePoints = checkDownTreePoints(this.state, skillTree, key);
        if ((hasDownTreePoints === false && value > 0)
          || (hasDownTreePoints === true && value > 1)) {

          if (e.shiftKey) {
            if (value - 10 < 1 && !hasDownTreePoints) {
               skillValueChange = value;
            }
            else if (value - 10 < 1 && hasDownTreePoints) {
               skillValueChange = value - 1;
            }
            else skillValueChange = 10;
          }
          if (e.ctrlKey) {
            skillValueChange = hasDownTreePoints === false ? value : value - 1;
          }
          this.setState({
            [key]: value - skillValueChange,
            skillpoints: availablePoints + skillValueChange
          });
        }
        return;
      }

      // get the skill's prerequisites and check if they are not 0
      let hasAllprereqs = checkPrerequisites(this.state, skillTree, r, c);
      if (availablePoints > 0 && value < 20 && hasAllprereqs === true) {
        if (e.shiftKey) {
          skillValueChange = availablePoints - 10 >= 0 ? 10 : availablePoints;
          skillValueChange = value + skillValueChange <= 20 ? skillValueChange : 20 - value;
        }
        if (e.ctrlKey) {
          skillValueChange = availablePoints - 20 >= 0 ? 20 - value : availablePoints;
        }
        this.setState({
          [key]: value + skillValueChange,
          skillpoints: availablePoints - skillValueChange });
      }
    }
  }

  render() {
    let CHAR_CLASS = this.props.charClass;
    const SKILL_TREE_NAMES = this.props.skillTreeNames;
    const SKILL_TREES = this.props.skillTrees;
    return (
      <div id="D2_skill_calculator">
        <Stack spacing={8} direction={["column", "column", "row", "row"]}>
          {
            SKILL_TREES.map((tree, i) => {
              return (
                <div
                  key={i}
                  className="skilltree"
                  onClick={e => this.handleClick(e, tree)}
                  onContextMenu={e => this.handleClick(e, tree)}
                >
                  <h4>{SKILL_TREE_NAMES[i].name}</h4>
                  <img
                    src={`/images/classes/${CHAR_CLASS}/${i+1}.jpg`}
                    alt={SKILL_TREE_NAMES[i].name}
                    useMap={`#${SKILL_TREE_NAMES[i].short}`}
                  />
                  <map name={SKILL_TREE_NAMES[i].short}>
                    <SkillList
                      skillTreeId={i+1}
                      skillTree={tree}
                      className={CHAR_CLASS}
                      handleMouseEnter={this.handleMouseEnter}
                      handleMouseLeave={this.handleMouseLeave}
                    />
                  </map>
                    <ScoreList
                      values={this.state}
                      skillTreeId={i+1}
                      skillTree={tree}
                    />
                </div>
              );
            })
          }
        </Stack>
        <Box mt="1em">
          Available Skill points: { this.state.skillpoints }
          { this.state.toolTipIsActive &&
            <Tooltip
              skill={this.state.activeTooltipData}
              style={this.state.toolTipStyle}
              dependency={this.state.activeTooltipDepencies}
              level={this.state[this.state.activeTooltipId]}
            />

          }
        </Box>
        <Box mt="1em">
            <CreateLink state={this.state} />
        </Box>
      </div>
    );
  }
}

export default D2Planner;

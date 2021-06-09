import React from "react";
import clsx from "clsx";
import {
	makeStyles,
	useTheme,
} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	chips: {
		display: "flex",
		flexWrap: "wrap",
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight:
				ITEM_HEIGHT * 4.5 +
				ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const names = [
	"Oliver Hansen",
	"Van Henry",
	"April Tucker",
	"Ralph Hubbard",
	"Omar Alexander",
	"Carlos Abbott",
	"Miriam Wagner",
	"Bradley Wilkerson",
	"Virginia Andrews",
	"Kelly Snyder",
];

function getStyles(name, personName, theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography
						.fontWeightRegular
				: theme.typography
						.fontWeightMedium,
	};
}

const Search = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [personName, setPersonName] =
		React.useState([]);

	const handleChange = (event) => {
		setPersonName(event.target.value);
	};

	const handleChangeMultiple = (event) => {
		const { options } = event.target;
		const value = [];
		for (
			let i = 0, l = options.length;
			i < l;
			i += 1
		) {
			if (options[i].selected) {
				value.push(options[i].value);
			}
		}
		setPersonName(value);
	};

	return (
		<div>
			<FormControl
				className={classes.formControl}
			>
				<InputLabel id="intolerance-checkbox-label">
					Intolerances
				</InputLabel>
				<Select
					labelId="intolerance-checkbox-label"
					id="intolerance-checkbox"
					multiple
					value={personName}
					onChange={handleChange}
					input={<Input />}
					renderValue={(selected) =>
						selected.join(", ")
					}
					MenuProps={MenuProps}
				>
					{names.map((name) => (
						<MenuItem
							key={name}
							value={name}
						>
							<Checkbox
								checked={
									personName.indexOf(
										name
									) > -1
								}
							/>
							<ListItemText
								primary={name}
							/>
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl
				className={clsx(
					classes.formControl,
					classes.noLabel
				)}
			>
				<Select
					multiple
					displayEmpty
					value={personName}
					onChange={handleChange}
					input={<Input />}
					renderValue={(selected) => {
						if (
							selected.length === 0
						) {
							return (
								<em>
									Placeholder
								</em>
							);
						}

						return selected.join(
							", "
						);
					}}
					MenuProps={MenuProps}
					inputProps={{
						"aria-label":
							"Without label",
					}}
				>
					<MenuItem disabled value="">
						<em>Placeholder</em>
					</MenuItem>
					{names.map((name) => (
						<MenuItem
							key={name}
							value={name}
							style={getStyles(
								name,
								personName,
								theme
							)}
						>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};

export default Search;

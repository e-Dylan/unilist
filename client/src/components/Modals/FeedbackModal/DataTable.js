import React, { useState, useEffect, useRef } from "react";
import '../../styles/SearchArea.scss';

// Components
import DataRow from './DataRow';

// Images/Icons

export default function DataTable({ title, table, rows }) {

	return (
		<div className="data-col flex-col">
			<span className="col-title">{title}</span>
			{ rows.map((row, index) => {
				return(
					<DataRow title={row[0]} table={table} value={row[1]} key={index} />
				)
			}) }
		</div> 
	);
}

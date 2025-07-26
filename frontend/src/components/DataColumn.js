import "../css/DataColumn.css";

const DataBlock = ({ title, value, className = "" }) => (
	<div className={`datacolumn-tblock ${className}`}>
		<div className="datacolumn-tr datacolumn-title">{title}</div>
		<div className="datacolumn-tr datacolumn-figure">${value}</div>
	</div>
);

const DataColumn = ({ data, className = "" }) => {
	return (
		<div className={`datacolumn-base ${className}`}>
			{data.map((item, index) => (
				<DataBlock
					key={item.id || index}
					title={item.title}
					value={item.value}
					className={item.className || ""}
				/>
			))}
		</div>
	);
};

export default DataColumn;

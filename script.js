const expensesCanv = document.getElementById('expenses');

const someExpenses = {
    categ1: 10,
    categ2: 20,
    categ3: 10,
    categ4: 20,
};

function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

const Piechart = function(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.draw = function() {
        
        var total_value = 0;
        var color_index = 0;
        for (var categ in this.options.data) {
            var val = this.options.data[categ];
            total_value += val;
        }
        var start_angle = 0;
        for (categ in this.options.data) {
            val = this.options.data[categ];
            var slice_angle = (2 * Math.PI * val) / total_value;
            drawPieSlice(
                this.ctx,
                this.canvas.width / 2,
                this.canvas.height / 2,
                Math.min(this.canvas.width / 2, this.canvas.height / 2),
                start_angle,
                start_angle + slice_angle,
                this.colors[color_index % this.colors.length]
            );
            start_angle += slice_angle;
            color_index++;
        }
        if (this.options.doughnutHoleSize){
            
			drawPieSlice(
				this.ctx,
				this.canvas.width/2,
				this.canvas.height/2,
				this.options.doughnutHoleSize * Math.min(this.canvas.width/2,this.canvas.height/2),
				0,
				2 * Math.PI,
				"#fff"
			);
		}
        if (this.options.legend){
			color_index = 0;
			var legendHTML = "";
			for (categ in this.options.data){
				legendHTML += "<div><span style='display:inline-block;width:20px;background-color:"+this.colors[color_index++]+";'>&nbsp;</span> "+categ+"</div>";
			}
			this.options.legend.innerHTML = legendHTML;
		}
    };
};

let expensesLegend = document.querySelector('expenses__legend');

let myPiechart = new Piechart({
    canvas: expensesCanv,
    data: someExpenses,
    colors: ["#004029", "#00B372", "#00E693", "#1AFFAC"],
    doughnutHoleSize:0.6,
    legend:expensesLegend
});
myPiechart.draw();

let incomeLegend = document.querySelector('income__legend');
const incomeCanv = document.getElementById('income');

let anotherOne = new Piechart({
    canvas: incomeCanv,
    data: someExpenses,
    colors: ["#001B3B", "#0052B3", "#0069E6", "#1A83FF"],
    doughnutHoleSize:0.6,
    legend:incomeLegend
});
anotherOne.draw();
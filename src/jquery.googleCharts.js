(function ($) {
    function GoogleChart(element, options) {
        this.loaded = false;
        var settings = {
            chartType:'',
            chartOptions: {
                
            },
            dataOptions: {
                columnsDefinition: [{ name: 'Column1', type: 'string', key: 'col1' }, { name: 'Value', type: 'number', key: 'val' }],
                data: [
                    { col1: 'K1', val: 1 },
                    { col1: 'K2', val: 2 },
                    { col1: 'K3', val: 3 },
                    { col1: 'K4', val: 4 },
                ],
            },
            loaderOptions: {
                version: '1.1',
                packages: ["gantt"]
            }
        };
        if (options) {
            $.extend(settings, options);
            this.container = $(element);
            this.initGoogleCharts(settings);
        }
        function setData(newData){
        }
        return this;
    }
    GoogleChart.prototype = {
        self:this,
        chart:null,
        drawChart: function () {
            var table = new google.visualization.DataTable();
            var rows = [];
            $(self.settings.dataOptions.columnsDefinition).each(function (index, column) {
                table.addColumn(column.type, column.name);
            });
            $(self.settings.dataOptions.data).each(function (dIndex, data) {
                var rowData = [];
            	$(self.settings.dataOptions.columnsDefinition).each(function (index, column) {
                rowData.push(data[column.key]);
                });
                rows.push(rowData);
            });
            table.addRows(rows);
            self.chart = new google.visualization[self.settings.chartType](document.getElementById(self.container.prop('id')));
            self.chart.draw(table,self.settings.chartOptions);
        },
        initGoogleCharts: function (settings) {
            this.settings = settings;
            self = this;
            $.getScript("https://www.google.com/jsapi", function () {
                google.load('visualization', settings.loaderOptions.version,{ packages:settings.loaderOptions.packages,callback:self.drawChart});
            });
        },
    };
    $.fn.googleChart = function (options) {
        return new GoogleChart(this, options);
    };
}(jQuery));
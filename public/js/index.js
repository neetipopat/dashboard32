$(document).ready(function () {
    // alert('yo');


    $("#search_table").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#output_table tr.row-data").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    // AJAX Call to get data based on device ID
    $('#submit_device_id').on('click', function () {

        var deviceID = {
            deviceID: $('#device_id').val()
        }
        $.ajax({
            url: '/getDeviceData',
            type: 'GET',
            data: deviceID,
            success: function (data) {
                const logs = data.logs;
                console.log(logs)
                // const newLogs = returnUpdatedLogs(logs)
                datatablesUI(logs, Object.values(logs).length, 'Device Details', 'output_data');

            },
            error: function (err) {
                console.error(err);
            }
        });
    })


    // function returnUpdatedLogs(logs) {
    //     for (var i = 0; i < logs.length; i++) {
    //         logs[i] = 
    //     }
    // }
    const Enums = {
        createdAt: 'Created At',
        deviceId: 'Device ID',
        port: 'Port',
        source: 'Source',
        state: 'State',
        updatedAt: 'Updated At'
    }

    function count(obj) {
        return Object.keys(obj).length;
    }

    function datatablesUI(result, length, msg, id) {

        //result: result object
        //length: number of rows in result Object
        //msg: heading of analysis table
        //id: id of div where table will be placed

        let cols = count(result[0]) //number of columns
        let keysArray = Object.keys(result[0]).slice(0) //keys of object

        //Make Table & Container Div

        let table = document.createElement('table')
        table.className = 'table';
        table.id = 'output_table'
        let containerDiv = document.createElement('div')

        //Table Heading

        let tableName = document.createElement('h5')
        let tableNameText = document.createTextNode(msg)

        tableName.append(tableNameText)

        //Initiate variables for individual column heads

        let tableHead = []
        let tableHeadText = []
        let tableHeadRow = document.createElement('tr')

        //First Row for Tables, which will hold table column headings (use enums for this)

        for (let j = 0; j < cols; j++) {
            let x = keysArray[j].toString()
            tableHeadText[j] = document.createTextNode(`${Enums[x]}`)
            tableHead[j] = document.createElement('th')
            tableHead[j].appendChild(tableHeadText[j])
            tableHeadRow.appendChild(tableHead[j])
        }
        table.append(tableHeadRow)
        containerDiv.append(tableName)

        //Table Text Nodes & Data Nodes
        let tn = []
        let td = []

        //Rest of the Table Creation

        for (let i = 0; i < length; i++) {
            //Iterating through the object to fetch values dynamically
            for (let j = 0; j < cols; j++) {
                let x = keysArray[j].toString()

                //For getting the commas in the number values

                if (x == 'Audience_Size')
                    tn[j] = document.createTextNode(parseInt(`${result[i][x]}`).toLocaleString('en-US'))
                else
                    tn[j] = document.createTextNode(`${result[i][x]}`)
                td[j] = document.createElement('td')
            }
            let tr = document.createElement('tr')
            tr.className = 'row-data'

            //Append Everything

            for (let j = 0; j < cols; j++) {
                td[j].appendChild(tn[j])
                tr.appendChild(td[j])
            }
            table.appendChild(tr)
        }
        containerDiv.append(table)
        document.getElementById(id).appendChild(containerDiv)

        $('#'+id).fadeIn(500)
    }

})
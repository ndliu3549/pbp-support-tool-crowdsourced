<template>
	<div id='app'>
		<div style='text-align:center;'>
			<h2>CPBL PLAY BY PLAY Support Tool</h2>

			<div>
				<a class='btn btn-light' href="http://localhost:8080/">
					Refresh Page（測試用）
				</a>
				
				<button type="button" class="btn btn-light" data-toggle="collapse" data-target="#readme" @click='Readme()'>
					操作示範
				</button>
			</div>

			<div id='readme' class="collapse">
				<h6 id='h6'></h6>
			</div>

			<div id='TestURLID'>
				<ul id='ul'></ul>
			</div>

			<div id='TestLog'>
				<h5 id='h5'></h5>
			</div>

		</div>

		<div>
			<router-view></router-view>
		</div>

	</div>
</template>

<script>
	var config = {
		apiKey: 'AIzaSyCaWqHus5lbszeGpNqjh9PhgnKbTY_GpaM',
		authDomain: 'new-firebase-3065e.firebaseapp.com',
		databaseURL: 'https://new-firebase-3065e.firebaseio.com',
		projectId: 'new-firebase-3065e',
		storageBucket: 'new-firebase-3065e.appspot.com',
	};
	firebase.initializeApp(config);

	var BaseballRef = firebase.database().ref('Baseball');
	var UserAnswer_BaseballRef = firebase.database().ref('UserAnswer_BaseballRef');
	var idArray = Array();
	var groupArray = Array();
	var PlayerListGroup = Array();

	export default {
		name: 'App',
		data() {
			return {
				ImportData: []
			}
		},
		methods: {
			getUrlKey(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
			},
			Readme() {
				let list = '';

				list = `
					<div>
						<div style='margin:10px 10px 10px 10px'>
							This is manual.
						</div>
						<div>
							<img src="/static/demo_06.gif" width="955" height="455" style='border-style: outset'/>
						</div>
					</div>
				`

				$('h6').html(list)
			},
			getImport() {

				let vm = this

				$(document).ready(function() {
					$('#files').bind('change', handleFileSelect);
				});

				function handleFileSelect(evt) {
					var files = evt.target.files;
					var file = files[0];

					printTable(file);
				}

				function printTable(file) {
					var reader = new FileReader();
					reader.readAsText(file);
					reader.onload = function(event) {
						var csv = event.target.result;
						vm.ImportData = $.csv.toObjects(csv);
					};
				}
			},
			getView(URL_id) {

				BaseballRef.on('value', function(snapshot) {

					console.log('hello2-2')

					let val = snapshot.val();
					let list = '';
					let inning = '';
					let arrayHeader = '';
					
					list = `
						<div style='margin:10px 10px 10px 10px; text-align:center' class="col">
								URL_id = ${URL_id}
						</div>
					`
					
					$.each(val, function(i, item) {
						
						if(inning != item.inning) {

							inning = item.inning

							arrayHeader = i;

							console.log('arrayHeader = ' + i)

							idArray[arrayHeader] = Array();

							groupArray.push(arrayHeader);
						}

						idArray[arrayHeader].push(i);

					});

					console.log('groupArray = ' + groupArray)

					$('ul').html(list)

				});
			}
		},
		mounted() {

			this.getImport();

			let URL_id = this.getUrlKey('id');

			console.log('hello2-1')

			this.getView(URL_id);

			var funcA = function(callback) {
				var i = Math.random() + 1;

				window.setTimeout(function() {
					console.log('function A');

					// 如果 callback 是個函式就呼叫它
					if(typeof callback === 'function') {
						callback();
					}

				}, i * 1000);
			};

			var funcB = function() {
				var i = Math.random() + 1;

				window.setTimeout(function() {
					console.log('function B');

					BaseballRef.on('value', function(snapshot) {
						let val = snapshot.val();
						let inning = '';
						let arrayHeader = '';

						$.each(val, function(i, item) {

							if(inning != item.inning) {

								inning = item.inning

								arrayHeader = i;

								idArray[arrayHeader] = Array();

							}

							idArray[arrayHeader].push(i);
						});

					});

					let list = '';

					var R_group = new Array(20);

					var Flag = true;

					console.log('groupArray.length = ' + groupArray.length)
					
					var groupArrayIndex = 1;
					for (var index in groupArray) {
						console.log('groupArray[' + groupArrayIndex + '] = ' + groupArray[index])
						groupArrayIndex++;
					}
					
					
					function getRandom(minNum, maxNum) { //取得 minNum(最小值) ~ maxNum(最大值) 之間的亂數
					    return Math.floor( Math.random() * (maxNum - minNum + 1) ) + minNum;
					}
					
					function getRandomArray(minNum, maxNum, n) {    //隨機產生不重覆的n個數字
					    var rdmArray = [n];     //儲存產生的陣列
					
					    for(var i=0; i<n; i++) {
					        var rdm = 0;        //暫存的亂數
					
					        do {
					            var exist = false;          //此亂數是否已存在
					            rdm = getRandom(minNum, maxNum);    //取得亂數
					            
					            //檢查亂數是否存在於陣列中，若存在則繼續回圈
					            if(rdmArray.indexOf(rdm) != -1) exist = true;
					            
					        } while (exist);    //產生沒出現過的亂數時離開迴圈
					        
					        rdmArray[i] = rdm;
					    }
					    return rdmArray;
					}
					
					var randomGroupArray = getRandomArray(0, groupArray.length-1, R_group.length);
					console.log('randomGroupArray = ' + randomGroupArray)

					var PageLogRandomArray = getRandomArray(0, 19, 20);
					var OkLogRandomArray = PageLogRandomArray.slice(0 , 10);
					var ErrLogRandomArray = PageLogRandomArray.slice(10, 20);

					for(var i = 0; i < R_group.length; i++) {

						R_group[i] = groupArray[randomGroupArray[i]];
						console.log('R_group[' + i + '] = ' + R_group[i])

					}

					console.log('R_group.length = ' + R_group.length)

					for(var i = 0; i < R_group.length; i++) {


						console.log('R_group[' + i + '] = ' + R_group[i])

						if ($.inArray(i, OkLogRandomArray) != -1) {
							list = `
								${list}
								<div style='margin:10px 10px 10px 10px; text-align:center' class="col">
									<br>
									【第 ${i+1} 局】OK
								</div>
							`
						} else if ($.inArray(i, ErrLogRandomArray) != -1) {
							list = `
								${list}
								<div style='margin:10px 10px 10px 10px; text-align:center' class="col">
									<br>
									【第 ${i+1} 局】ERR
								</div>
							`
						}

						PlayerListGroup[R_group[i]] = Array();

						for(var index in idArray[R_group[i]]) {

							console.log('idArray[R_group[i]] = ' + idArray[R_group[i]])

							var ID = idArray[R_group[i]][index];

							firebase.database().ref('/Baseball/' + ID).on('value', function(snapshot) {

								let val = snapshot.val();

								list = `
									${list}
									<div style='margin:5px 5px 5px 5px; text-align:center' class="col">
										<pre style='font-weight:bold'>${val.log}</pre>
										<input disabled id='input_Player${ID}' style='text-align:center; width:70px' value=${val.Player} />
								`
								
								if ($.inArray(i, OkLogRandomArray) != -1) {
									list = `
										${list}
											<select id='input_base1${ID}' style='width:100px'>
											<option value =${val.base1}>${val.base1}</option></select>
											<select id='input_base2${ID}' style='width:100px'>
											<option value =${val.base2}>${val.base2}</option></select>
											<select id='input_base3${ID}' style='width:100px'>
											<option value =${val.base3}>${val.base3}</option></select>
									`
								} else if ($.inArray(i, ErrLogRandomArray) != -1) {
									console.log('ERR_Log ID = ' + ID)
									list = `
										${list}
											<select id='input_err_base1${ID}' style='width:100px'>
											<option value =${val.err_base1}>${val.err_base1}</option></select>
											<select id='input_err_base2${ID}' style='width:100px'>
											<option value =${val.err_base2}>${val.err_base2}</option></select>
											<select id='input_err_base3${ID}' style='width:100px'>
											<option value =${val.err_base3}>${val.err_base3}</option></select>
									`
								}
								
								list = `
									${list}
										<input disabled id='input_id${ID}' style='text-align:center; width:70px' value=${val.id} />
										<input disabled id='input_direction${ID}' style='text-align:center; width:40px' value=${val.direction} />
										<input disabled id='input_out${ID}' style='text-align:center; width:70px' value=${val.out} />
										<input disabled id='input_result${ID}' style='text-align:center; width:320px' value=${val.result} />
									</div>
								`

								PlayerListGroup[R_group[i]].push(val.Player);
							});
						}

						var testIndex = 0;
						for (var index in PlayerListGroup) {
							testIndex++;
						}
						console.log('PlayerListGroup.length = ' + testIndex)

					}

					list = `
						${list}
						<br>
						<button id='finish' type='button' class='finish btn btn-secondary'>提交作答</button>
					`

					$('h5').html(list)

					function PlayerOptionAdd(select_ID, index) {
						
						var option_ID = document.getElementById(select_ID);
						
						var option = document.createElement('option');
						option.text = '---------'
						option_ID.add(option);
						
						var option = document.createElement('option');
						option.text = 'NA'
						option_ID.add(option);
						
						for(var player_index in PlayerListGroup[index]) {
							var option = document.createElement('option');
							option.text = PlayerListGroup[index][player_index];
							if ( (option.text != '') && (option.text != '/') )
								option_ID.add(option);
						}
					}

					for(var index in PlayerListGroup) {
						console.log('PlayerListGroup[' + index + '] = ' + PlayerListGroup[index])
						var G_index = index;
						console.log('idArray[' + G_index + '] = ' + idArray[G_index])
						
						for(var idArray_index in idArray[G_index]) {
							
							if (!document.getElementById( 'input_base1' + idArray[G_index][idArray_index] )) {
								console.log('This is ERR Log')
								var select_ID_1 = 'input_err_base1' + idArray[G_index][idArray_index];
								var select_ID_2 = 'input_err_base2' + idArray[G_index][idArray_index];
								var select_ID_3 = 'input_err_base3' + idArray[G_index][idArray_index];
							} else {
								var select_ID_1 = 'input_base1' + idArray[G_index][idArray_index];
								var select_ID_2 = 'input_base2' + idArray[G_index][idArray_index];
								var select_ID_3 = 'input_base3' + idArray[G_index][idArray_index];
							}

							PlayerOptionAdd(select_ID_1, G_index);
							PlayerOptionAdd(select_ID_2, G_index);
							PlayerOptionAdd(select_ID_3, G_index);
						}
					}

					function getNowTime(){
						var timeDate= new Date();
						var tMonth = (timeDate.getMonth()+1) > 9 ? (timeDate.getMonth()+1) : '0'+(timeDate.getMonth()+1);
						var tDate = timeDate.getDate() > 9 ? timeDate.getDate() : '0'+timeDate.getDate();
						var tHours = timeDate.getHours() > 9 ? timeDate.getHours() : '0'+timeDate.getHours();
						var tMinutes = timeDate.getMinutes() > 9 ? timeDate.getMinutes() : '0'+timeDate.getMinutes();
						var tSeconds = timeDate.getSeconds() > 9 ? timeDate.getSeconds() : '0'+timeDate.getSeconds();
						return timeDate= timeDate.getFullYear()+'-'+ tMonth +'-'+ tDate +' '+ tHours +':'+ tMinutes +':'+ tSeconds;
					}

					$('#h5').on('click', '.finish', function() {
						
						$('#finish.finish.btn.btn-secondary').attr('disabled', true);
						
						var User_Answer_Result;
						var Commit_Time = getNowTime();
						var Commit_Accuracy = 0;
						var Inning_Index = '';
						var Inning_Counter = 0;
						
						var csv_header = "Inning_Index,Answer_Base1,Answer_Base2, \
							Answer_Base3,Result,User_Base1,User_Base2,User_Base3,Answer_Log\n";
						var csv_data = '';
						
						console.log("URL_id = " + URL_id)
						
						var TestJSON = JSON.stringify
						({
							code: URL_id,
							report: "完成"
						})
						
						console.log("TestJSON = " + TestJSON)
						
						$.ajax({
							type:"patch",
							data:TestJSON,
							url:"https://bountyworkers.net/api/task-report",
							success: function (data, status) {
								alert("Status: " + status);
							},
							error: function(data, error)
							{
							    console.log(jQuery.parseJSON(data.responseText).message);
							}
						});

						function createCsvFile(data) {
							var fileName = 'UserID_' + URL_id + '[' + Commit_Time + ']' + ".csv"; //匯出的檔名
							var blob = new Blob([data], {
								type : "application/octet-stream"
							});
							var href = URL.createObjectURL(blob);
							var link = document.createElement("a");
							document.body.appendChild(link);
							link.href = href;
							link.download = fileName;
							link.click();
						}

						for(var i = 0; i < R_group.length; i++) {

							var key = R_group[i];

							var dataArray = Array();

							for(var index in idArray[key]) {

								dataArray[index] = Array();
								dataArray[index][0] = $('#input_Player' + idArray[key][index]).val()
								
								if (!document.getElementById( 'input_base1' + idArray[key][index] )) {
									dataArray[index][1] = $('#input_err_base1' + idArray[key][index]).val()
									dataArray[index][2] = $('#input_err_base2' + idArray[key][index]).val()
									dataArray[index][3] = $('#input_err_base3' + idArray[key][index]).val()
								} else {
									dataArray[index][1] = $('#input_base1' + idArray[key][index]).val()
									dataArray[index][2] = $('#input_base2' + idArray[key][index]).val()
									dataArray[index][3] = $('#input_base3' + idArray[key][index]).val()
								}

								dataArray[index][4] = $('#input_id' + idArray[key][index]).val()
								dataArray[index][5] = $('#input_direction' + idArray[key][index]).val()
								dataArray[index][6] = $('#input_out' + idArray[key][index]).val()
								dataArray[index][7] = $('#input_result' + idArray[key][index]).val()
							}

							for(var index in idArray[key]) {
								if (!document.getElementById( 'input_base1' + idArray[key][index] )) {
									$('#input_err_base1' + idArray[key][index]).attr('disabled', true);
									$('#input_err_base2' + idArray[key][index]).attr('disabled', true);
									$('#input_err_base3' + idArray[key][index]).attr('disabled', true);
								} else {
									$('#input_base1' + idArray[key][index]).attr('disabled', true);
									$('#input_base2' + idArray[key][index]).attr('disabled', true);
									$('#input_base3' + idArray[key][index]).attr('disabled', true);
								}
							}

							function GroupCompare() {

								var Comp = true;

								for(var index in idArray[key]) {

									BaseballRef.child(idArray[key][index]).once('value', function(snapshot) {

										function LogCompare(DB_Log, Input_Log) {
											if((DB_Log != Input_Log) && ((DB_Log != '') || (Input_Log != '/'))) {
												return false;
											}
											else {
												return true;
											}
										}

										if(LogCompare(snapshot.val().Player, dataArray[index][0]) &&
											LogCompare(snapshot.val().base1, dataArray[index][1]) &&
											LogCompare(snapshot.val().base2, dataArray[index][2]) &&
											LogCompare(snapshot.val().base3, dataArray[index][3]) &&
											LogCompare(snapshot.val().id, dataArray[index][4]) &&
											LogCompare(snapshot.val().direction, dataArray[index][5]) &&
											LogCompare(snapshot.val().out, dataArray[index][6]) &&
											LogCompare(snapshot.val().result, dataArray[index][7])) {
												
											} else {
												Comp = false;
										}
											
									})
								}

								if(Comp) {
									Commit_Accuracy++;
									return true;
								}
								else {
									return false;
								}
							}

							if(GroupCompare()) {
								User_Answer_Result = 'True';
								console.log('Input True')
							}
							else {
								User_Answer_Result = 'False';
								console.log('Input False')
							}
							
							for(var index in idArray[key]) {

								BaseballRef.child(idArray[key][index]).once('value', function(snapshot) {

									UserAnswer_BaseballRef.child(URL_id).child(Commit_Time).child(key).child(idArray[key][index]).set({
										User_Base1: dataArray[index][1],
										User_Base2: dataArray[index][2],
										User_Base3: dataArray[index][3],
										Answer_Base1: snapshot.val().base1,
										Answer_Base2: snapshot.val().base2,
										Answer_Base3: snapshot.val().base3,
										Answer_Log: snapshot.val().log,
										Result: User_Answer_Result
									})
									
									if (Inning_Index == key) {
										csv_data = csv_data + ' ' + ',';
										User_Answer_Result = '';
									}
									else {
										Inning_Counter++;
										Inning_Index = key;
										csv_data = csv_data + Inning_Counter + ',';
									}
									
									csv_data = csv_data
									+ snapshot.val().base1 + ',' + snapshot.val().base2 + ',' 
									+ snapshot.val().base3 + ',' + User_Answer_Result + ',' 
									+ dataArray[index][1] + ','+ dataArray[index][2] + ',' 
									+ dataArray[index][3] + ',' + snapshot.val().log + '\n';
								})
							}
						}
						
//						+ 'Average_Commit_Accuracy [' + Average_Commit_Accuracy/20*100 + '%]' 
						
						csv_data = '[' + Commit_Time + ']' + ',' 
									+ 'Commit_Accuracy [' + Commit_Accuracy/20*100 + '%]' + ',' 
									+ '\n' + csv_header + csv_data;
							
						createCsvFile(csv_data);
					});

				}, i * 1000);
			};
			funcA(funcB);
		}
	}
</script>

<style>
	pre {
		outline: 1px solid #ccc;
		padding: 5px;
		margin: 5px 5px 5px 5px;
	}
	
	.string {
		color: green;
	}
	
	.number {
		color: darkorange;
	}
	
	.boolean {
		color: blue;
	}
	
	.null {
		color: magenta;
	}
	
	.key {
		color: red;
	}
	
	input[type="file"] {
		display: none;
	}
	
	.custom-file-upload {
		border: 1px solid #ccc;
		display: inline-block;
		padding: 6px 12px;
		cursor: pointer;
	}
</style>
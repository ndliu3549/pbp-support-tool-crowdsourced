<template>
	<div id='app'>
		<div style='text-align:center;'>
			<h2>CPBL PLAY BY PLAY Support Tool</h2>

			<div>
				<a class='btn btn-light' href="http://localhost:8080/">Refresh Page</a>
				
				<button class='btn btn-light' type='button' @click='NewImport(ImportData)'>
					Import New LOG
				</button>

				<label for="files" class="custom-file-upload">
    				<i class="fa fa-cloud-upload"></i> Select File（CSV）
				</label>

				<input id="files" type="file" name="files[]" multiple/>

				<button class='btn btn-light' type='button' @click='OldImport(ImportData)'>
					Import Old LOG
				</button>
			<!--</div>

			<div>-->
				<button class='btn btn-light' type='button' @click="getExportJSON">
					<downloadExcel :data="exportjson" :fields="json_fields" type="csv" name="Old LOG.csv">
						Export Old LOG（Double Click）
					</downloadExcel>
				</button>

				<button class='btn btn-light' type='button' @click='CleanData()'>
					Clean Data
				</button>

				<button type="button" class="btn btn-dark" data-toggle="collapse" data-target="#readme" @click='Readme()'>
					Readme
				</button>
			</div>

			<div id='readme' class="collapse">
				<h6 id='h6'></h6>
			</div>
			
			<div id='TestLog'>
				<h5 id='h5'></h5>
			</div>
			
			<!--<div style='margin:5px 5px 5px 5px; text-align:center'>
				<button type="button" class="btn btn-info" @click='getLog()'>
					Page Display Log
				</button>
			</div>-->

		</div>

		<div>
			<router-view></router-view>
			<!--<div>
				<ul id='ul'>
				</ul>
			</div>-->
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
	var idArray = Array();
	var groupArray = Array();
	
//	var URL_id_new = getUrlKey('id');

	export default {
		name: 'App',
		data() {
			return {
				ImportData: [],
				isShow: false,
				exportjson: [],
				json_fields: {
					'base1': 'base1',
					'base2': 'base2',
					'base3': 'base3',
					'direction': 'direction',
					'game': 'game',
					'id': 'id',
					'inning': 'inning',
					'log': 'log',
					'out': 'out',
					'Player': 'Player',
					'result': 'result',
					'team': 'team'
				},
			}
		},
		methods: {
			getLog() {
				
				console.log('hello1')
				
				BaseballRef.on('value', function(snapshot) {
					let val = snapshot.val();
					let inning = '';
					let arrayHeader = '';

					$.each(val, function(i, item) {

						if(inning != item.inning) {

							inning = item.inning

							arrayHeader = i;
							
							idArray[arrayHeader] = Array();
							
//							console.log('idArray[' + arrayHeader + ']')
						}

						idArray[arrayHeader].push(i);
					});

				});

				let list = '';

//				var R_ID = Math.floor(Math.random()*147)+0

//				var R_ID = 16
//
//				var groupID = ''.concat('LogID_', R_ID);
//				
//
//				console.log(idArray)
//
//
//				var Num_ID = parseInt('LogID_16')
//				
//				console.log(idArray[Num_ID])
				
//				var groupID = 'LogID_0'
				
//				console.log('groupID = ' + groupID)
				
//				console.log('page_groupID: ' + idArray[groupID])

//				console.log('groupArray.length = ' + groupArray.length)
				
//				var groupID = this.$route.params.id;

//				var R_groupID = groupArray[parseInt(Math.random()*groupArray.length)];
				
				var R_group = new Array(5);
				
//				console.log('R_group.length = ' + R_group.length)
				
				var Flag = true;
				
				
				
				for(var i = 0; i < R_group.length; i++) {
					
//					console.log('R_group.length = ' + R_group.length)
					
//					while (Flag) {
//						var TempVal = groupArray[parseInt(Math.random()*groupArray.length)];
//						for(var j = 0; j < R_group.length; j++) {
//							if (TempVal == R_group[j]) {
//								break;
//							}
//							else if ((i == R_group.length-1) && (j == R_group.length-1)) {
//								R_group[i] = TempVal;
//								console.log('TempVal = ' + TempVal)
//								Flag = false;
//							}
//								
//						}
//					}

					R_group[i] = groupArray[parseInt(Math.random()*groupArray.length)];
					
//					console.log('R_group[' + i + '] = ' + R_group[i])
				}
				
				
				
//				console.log('R_groupID = ' + R_groupID)
				
//				console.log('idArray.length = ' + idArray.length)
				
//				console.log(idArray[groupID][0])

				for(var i = 0; i < R_group.length; i++) {

					console.log('R_group[' + i + '] = ' + R_group[i])

					for(var index in idArray[R_group[i]]) {
	
						console.log('idArray[R_group[i]] = ' + idArray[R_group[i]])
	
						var ID = idArray[R_group[i]][index];
						
						console.log(ID)
	
						firebase.database().ref('/Baseball/' + ID).on('value', function(snapshot) {
	
							let val = snapshot.val();
	
							list = `
							${list}
							<div style='margin:5px 5px 5px 5px; text-align:center' class="col">
								<pre style='font-weight:bold'>${val.log}</pre>
								<input disabled id='input_Player${ID}' style='text-align:center; width:70px' value=${val.Player} />
								<input disabled id='input_base1${ID}' style='text-align:center; width:70px' value=${val.base1} />
								<input disabled id='input_base2${ID}' style='text-align:center; width:70px' value=${val.base2} />
								<input disabled id='input_base3${ID}' style='text-align:center; width:70px' value=${val.base3} />
								<input disabled id='input_id${ID}' style='text-align:center; width:70px' value=${val.id} />
								<input disabled id='input_direction${ID}' style='text-align:center; width:40px' value=${val.direction} />
								<input disabled id='input_out${ID}' style='text-align:center; width:70px' value=${val.out} />
								<input disabled id='input_result${ID}' style='text-align:center; width:320px' value=${val.result} />
							</div>
						`
						});
					}
	
					list = `
						${list}
						<div style='margin:10px 10px 10px 10px; text-align:center' class="col">
							<button id='enable_modify${R_group[i]}'
								type='button' class='enable btn btn-light' data-key=${R_group[i]}>Enable</button>
							<button disabled id='summit_modify${R_group[i]}'
								type='button' class='summit btn btn-light' data-key=${R_group[i]}>Commit</button>
						</div>
					`

				}

				$('h5').html(list)

				$('#h5').on('click', '.enable', function() {

					var key = $(this).data('key');

					for(var index in idArray[key]) {

						$('#input_Player' + idArray[key][index]).attr('disabled', false);
						$('#input_base1' + idArray[key][index]).attr('disabled', false);
						$('#input_base2' + idArray[key][index]).attr('disabled', false);
						$('#input_base3' + idArray[key][index]).attr('disabled', false);
						$('#input_id' + idArray[key][index]).attr('disabled', false);
						$('#input_direction' + idArray[key][index]).attr('disabled', false);
						$('#input_out' + idArray[key][index]).attr('disabled', false);
						$('#input_result' + idArray[key][index]).attr('disabled', false);
						$('#summit_modify' + idArray[key][index]).attr('disabled', false);

						$('#enable_modify' + idArray[key][index]).attr('disabled', true);
					}
				});

				$('#h5').on('click', '.summit', function() {

					var key = $(this).data('key');

					var dataArray = Array();

					for(var index in idArray[key]) {

						dataArray[index] = Array();
						dataArray[index][0] = $('#input_Player' + idArray[key][index]).val()
						dataArray[index][1] = $('#input_base1' + idArray[key][index]).val()
						dataArray[index][2] = $('#input_base2' + idArray[key][index]).val()
						dataArray[index][3] = $('#input_base3' + idArray[key][index]).val()
						dataArray[index][4] = $('#input_id' + idArray[key][index]).val()
						dataArray[index][5] = $('#input_direction' + idArray[key][index]).val()
						dataArray[index][6] = $('#input_out' + idArray[key][index]).val()
						dataArray[index][7] = $('#input_result' + idArray[key][index]).val()
					}

					for(var index in idArray[key]) {

						BaseballRef.child(idArray[key][index]).update({
							'Player': dataArray[index][0],
							'base1': dataArray[index][1],
							'base2': dataArray[index][2],
							'base3': dataArray[index][3],
							'id': dataArray[index][4],
							'direction': dataArray[index][5],
							'out': dataArray[index][6],
							'result': dataArray[index][7]
						});

						$('#input_Player' + idArray[key][index]).attr('disabled', true);
						$('#input_base1' + idArray[key][index]).attr('disabled', true);
						$('#input_base2' + idArray[key][index]).attr('disabled', true);
						$('#input_base3' + idArray[key][index]).attr('disabled', true);
						$('#input_id' + idArray[key][index]).attr('disabled', true);
						$('#input_direction' + idArray[key][index]).attr('disabled', true);
						$('#input_out' + idArray[key][index]).attr('disabled', true);
						$('#input_result' + idArray[key][index]).attr('disabled', true);
						$('#summit_modify' + idArray[key][index]).attr('disabled', true);

						$('#enable_modify' + idArray[key][index]).attr('disabled', false);
					}
					
//					modifiedArray.push(key);
//					
//					var length = modifiedArray.length;
//					
//					for (var i=0; i < length; i++) {
//						$("#"+modifiedArray[i]).css("background-color", "#8064A1")
//					}
				});

			},
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
			getExportJSON() {
				let vm = this;
				BaseballRef.on('value', function(snapshot) {
					let val = snapshot.val();
					$.each(val, function(i, item) {
						vm.exportjson.push(item);
					});
				});
			},
			CleanData() {
				BaseballRef.remove();
			},
			OldImport(ImportData) {

				for(var i = 0; i < ImportData.length; i++) {
	
	
	
//					var LogID = ''.concat('LogID_', i);
					
//					var LogID = i
//					
//					console.log('LogID = ' + LogID)
//					
//					var Num_ID = Number(LogID)
//					
//					console.log('Num_ID = ' + Num_ID)
	
//					window[Num_ID] = {
					window['LogID_' + i] = {
						game: ImportData[i].game,
						team: ImportData[i].team,
						inning: ImportData[i].inning,
						log: ImportData[i].log,
						Player: ImportData[i].Player,
						base1: ImportData[i].base1,
						base2: ImportData[i].base2,
						base3: ImportData[i].base3,
						id: ImportData[i].id,
						direction: ImportData[i].direction,
						out: ImportData[i].out,
						result: ImportData[i].result
					}
					
					firebase.database().ref('Baseball/LogID_' + i).set(window['LogID_' + i])
				}
			},
			NewImport(ImportData) {
				let away = '';
				let home = '';
				let firstPart = '';
				let secondPart = '';
				let thirdPart = '';

				for(var i = 0; i < ImportData.length; i++) {

					if(ImportData[i].Player != '') {

						if(firstPart != ImportData[i].numforgame)
							if(ImportData[i].numforgame != '') firstPart = ImportData[i].numforgame;

						secondPart = ImportData[i].away + ' VS ' + ImportData[i].home

						if(thirdPart != ImportData[i].inning) thirdPart = ImportData[i].inning;

						BaseballRef.push({
							game: firstPart,
							team: secondPart,
							inning: thirdPart,
							log: ImportData[i].log,
							Player: ImportData[i].Player,
							base1: ImportData[i].base1,
							base2: ImportData[i].base2,
							base3: ImportData[i].base3,
							id: ImportData[i].id,
							direction: ImportData[i].direction,
							out: ImportData[i].out,
							result: ImportData[i].result
						})
					}
				}
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
//				BaseballRef.off()
				BaseballRef.on('value', function(snapshot) {
					
					console.log('hello2-2')
					
					let val = snapshot.val();
					let list = '';
					let inning = '';
					let arrayHeader = '';
					let itemGame = '';
	
					list = `
						<div style='font-weight:bold; margin:5px 100px 5px 5px; float:right'>
								URL_id = ${URL_id}
						</div>
					`
	
					list = `
						${list}
						<div>
					`
	
					$.each(val, function(i, item) {
	
						if(itemGame != item.game) {
							itemGame = item.game;
	
							list = `
								${list}
								</div>
								<div style='margin:5px 5px 5px 5px'>
									<button type="button" class="btn btn-secondary" data-toggle="collapse" data-target="#clapsme${itemGame}">
										第 ${itemGame} 場
									</button>
								</div>
								<div id='clapsme${itemGame}' class="collapse">
							`
						}
	
						if(inning != item.inning) {
	
							list = `
								${list}
								<a id="${i}" href="#/child/${i}" style='margin:5px 5px 5px 5px'
									class="router-link-exact-active router-link-active btn btn-secondary ">
										第${item.game}場：${item.team}：${item.inning}
								</a>
							`
	
							inning = item.inning
	
							arrayHeader = i;
	
							idArray[arrayHeader] = Array();
							
							groupArray.push(arrayHeader);
							
						}
						
	//					console.log('idArray[' + arrayHeader + '] = ' + idArray[arrayHeader])
	
						idArray[arrayHeader].push(i);
					});
					
					console.log('groupArray = ' + groupArray)
					
	//				console.log('arrayHeader = ' + arrayHeader)
	
					$('ul').html(list)
					
				});
//				BaseballRef.off()
			}
		},
		mounted() {

//			this.getLog();

//			console.log('URL_id_new = ' + URL_id_new)

			this.getImport();
			
			let URL_id = this.getUrlKey('id');
			
			console.log('hello2-1')
			
//			this.getView(URL_id);
			
//			console.log('groupArray.length = ' + groupArray.length)
			
//			while (groupArray == 0) {
				
//			}
			
			var funcA = function(callback){
			  var i = Math.random() + 1;
			
			  window.setTimeout(function(){
			    console.log('function A');
			    
			    
			    
			    BaseballRef.on('value', function(snapshot) {
					
					console.log('hello2-2')
					
					let val = snapshot.val();
					let list = '';
					let inning = '';
					let arrayHeader = '';
					let itemGame = '';
	
					list = `
						<div style='font-weight:bold; margin:5px 100px 5px 5px; float:right'>
								URL_id = ${URL_id}
						</div>
					`
	
					list = `
						${list}
						<div>
					`
	
					$.each(val, function(i, item) {
	
						if(itemGame != item.game) {
							itemGame = item.game;
	
							list = `
								${list}
								</div>
								<div style='margin:5px 5px 5px 5px'>
									<button type="button" class="btn btn-secondary" data-toggle="collapse" data-target="#clapsme${itemGame}">
										第 ${itemGame} 場
									</button>
								</div>
								<div id='clapsme${itemGame}' class="collapse">
							`
						}
	
						if(inning != item.inning) {
	
							list = `
								${list}
								<a id="${i}" href="#/child/${i}" style='margin:5px 5px 5px 5px'
									class="router-link-exact-active router-link-active btn btn-secondary ">
										第${item.game}場：${item.team}：${item.inning}
								</a>
							`
	
							inning = item.inning
	
							arrayHeader = i;
	
							idArray[arrayHeader] = Array();
							
							groupArray.push(arrayHeader);
							
						}
						
	//					console.log('idArray[' + arrayHeader + '] = ' + idArray[arrayHeader])
	
						idArray[arrayHeader].push(i);
					});
					
					console.log('groupArray = ' + groupArray)
					
	//				console.log('arrayHeader = ' + arrayHeader)
	
					$('ul').html(list)
					
				});
			    
			    
			    
			
			    // 如果 callback 是個函式就呼叫它
			    if( typeof callback === 'function' ){
			      callback();
			    }
			
			  }, i * 1000);
			};
			
			var funcB = function(){
			  var i = Math.random() + 1;
			
			  window.setTimeout(function(){
			    console.log('function B');
//			    this.getLog();



				BaseballRef.on('value', function(snapshot) {
					let val = snapshot.val();
					let inning = '';
					let arrayHeader = '';

					$.each(val, function(i, item) {

						if(inning != item.inning) {

							inning = item.inning

							arrayHeader = i;
							
							idArray[arrayHeader] = Array();
							
//							console.log('idArray[' + arrayHeader + ']')
						}

						idArray[arrayHeader].push(i);
					});

				});

				let list = '';

//				var R_ID = Math.floor(Math.random()*147)+0

//				var R_ID = 16
//
//				var groupID = ''.concat('LogID_', R_ID);
//				
//
//				console.log(idArray)
//
//
//				var Num_ID = parseInt('LogID_16')
//				
//				console.log(idArray[Num_ID])
				
//				var groupID = 'LogID_0'
				
//				console.log('groupID = ' + groupID)
				
//				console.log('page_groupID: ' + idArray[groupID])

//				console.log('groupArray.length = ' + groupArray.length)
				
//				var groupID = this.$route.params.id;

//				var R_groupID = groupArray[parseInt(Math.random()*groupArray.length)];
				
				var R_group = new Array(5);
				
//				console.log('R_group.length = ' + R_group.length)
				
				var Flag = true;
				
				
				
				for(var i = 0; i < R_group.length; i++) {
					
//					console.log('R_group.length = ' + R_group.length)
					
//					while (Flag) {
//						var TempVal = groupArray[parseInt(Math.random()*groupArray.length)];
//						for(var j = 0; j < R_group.length; j++) {
//							if (TempVal == R_group[j]) {
//								break;
//							}
//							else if ((i == R_group.length-1) && (j == R_group.length-1)) {
//								R_group[i] = TempVal;
//								console.log('TempVal = ' + TempVal)
//								Flag = false;
//							}
//								
//						}
//					}

					R_group[i] = groupArray[parseInt(Math.random()*groupArray.length)];
					
//					console.log('R_group[' + i + '] = ' + R_group[i])
				}
				
				
				
//				console.log('R_groupID = ' + R_groupID)
				
//				console.log('idArray.length = ' + idArray.length)
				
//				console.log(idArray[groupID][0])

				for(var i = 0; i < R_group.length; i++) {

					console.log('R_group[' + i + '] = ' + R_group[i])

					for(var index in idArray[R_group[i]]) {
	
						console.log('iidArray[R_group[i]] = ' + idArray[R_group[i]])
	
						var ID = idArray[R_group[i]][index];
						
						console.log(ID)
	
						firebase.database().ref('/Baseball/' + ID).on('value', function(snapshot) {
	
							let val = snapshot.val();
	
							list = `
							${list}
							<div style='margin:5px 5px 5px 5px; text-align:center' class="col">
								<pre style='font-weight:bold'>${val.log}</pre>
								<input disabled id='input_Player${ID}' style='text-align:center; width:70px' value=${val.Player} />
								<input disabled id='input_base1${ID}' style='text-align:center; width:70px' value=${val.base1} />
								<input disabled id='input_base2${ID}' style='text-align:center; width:70px' value=${val.base2} />
								<input disabled id='input_base3${ID}' style='text-align:center; width:70px' value=${val.base3} />
								<input disabled id='input_id${ID}' style='text-align:center; width:70px' value=${val.id} />
								<input disabled id='input_direction${ID}' style='text-align:center; width:40px' value=${val.direction} />
								<input disabled id='input_out${ID}' style='text-align:center; width:70px' value=${val.out} />
								<input disabled id='input_result${ID}' style='text-align:center; width:320px' value=${val.result} />
							</div>
						`
						});
					}
	
					console.log('URL_id = ' + URL_id)
	
					URL_id = '1234'
	
					if (URL_id != null) {
						list = `
							${list}
							<div style='margin:10px 10px 10px 10px; text-align:center' class="col">
								<button id='enable_modify${R_group[i]}'
									type='button' class='enable btn btn-light' data-key=${R_group[i]}>Enable</button>
								<button disabled id='summit_modify${R_group[i]}'
									type='button' class='summit btn btn-light' data-key=${R_group[i]}>Commit</button>
							</div>
						`
					} else {
						list = `
							${list}
							<div style='margin:10px 10px 10px 10px; text-align:center' class="col">
								<button id='enable_modify${R_group[i]}'
									type='button' class='enable btn btn-light' data-key=${R_group[i]}>True</button>
								<button disabled id='summit_modify${R_group[i]}'
									type='button' class='summit btn btn-light' data-key=${R_group[i]}>False</button>
							</div>
						`
					}
	
				}

				$('h5').html(list)

				$('#h5').on('click', '.enable', function() {

					var key = $(this).data('key');

					for(var index in idArray[key]) {

						$('#input_Player' + idArray[key][index]).attr('disabled', false);
						$('#input_base1' + idArray[key][index]).attr('disabled', false);
						$('#input_base2' + idArray[key][index]).attr('disabled', false);
						$('#input_base3' + idArray[key][index]).attr('disabled', false);
						$('#input_id' + idArray[key][index]).attr('disabled', false);
						$('#input_direction' + idArray[key][index]).attr('disabled', false);
						$('#input_out' + idArray[key][index]).attr('disabled', false);
						$('#input_result' + idArray[key][index]).attr('disabled', false);
						$('#summit_modify' + idArray[key][index]).attr('disabled', false);

						$('#enable_modify' + idArray[key][index]).attr('disabled', true);
					}
				});

				$('#h5').on('click', '.summit', function() {

					var key = $(this).data('key');

					var dataArray = Array();

					for(var index in idArray[key]) {

						dataArray[index] = Array();
						dataArray[index][0] = $('#input_Player' + idArray[key][index]).val()
						dataArray[index][1] = $('#input_base1' + idArray[key][index]).val()
						dataArray[index][2] = $('#input_base2' + idArray[key][index]).val()
						dataArray[index][3] = $('#input_base3' + idArray[key][index]).val()
						dataArray[index][4] = $('#input_id' + idArray[key][index]).val()
						dataArray[index][5] = $('#input_direction' + idArray[key][index]).val()
						dataArray[index][6] = $('#input_out' + idArray[key][index]).val()
						dataArray[index][7] = $('#input_result' + idArray[key][index]).val()
					}

					function GroupCompare() {
						
						var Comp = true;
						
						for(var index in idArray[key]) {
	
							BaseballRef.child(idArray[key][index]).once('value',  function(snapshot) {
								
								function LogCompare (DB_Log, Input_Log) {
									if ( (DB_Log != Input_Log) && ( (DB_Log != '') || (Input_Log != '/') ) ) {
										console.log('False: ' + DB_Log + ' V.S. ' + Input_Log)
										return false;
									}
									else
										return true;
								}
								
								if ( LogCompare (snapshot.val().Player, dataArray[index][0]) &&
									LogCompare (snapshot.val().base1, dataArray[index][1]) &&
									LogCompare (snapshot.val().base2, dataArray[index][2]) &&
									LogCompare (snapshot.val().base3, dataArray[index][3]) &&
									LogCompare (snapshot.val().id, dataArray[index][4]) &&
									LogCompare (snapshot.val().direction, dataArray[index][5]) &&
									LogCompare (snapshot.val().out, dataArray[index][6]) &&
									LogCompare (snapshot.val().result, dataArray[index][7]) ) {
									}
									else {
										Comp = false;
									}
										
							} )
							
							$('#input_Player' + idArray[key][index]).attr('disabled', true);
							$('#input_base1' + idArray[key][index]).attr('disabled', true);
							$('#input_base2' + idArray[key][index]).attr('disabled', true);
							$('#input_base3' + idArray[key][index]).attr('disabled', true);
							$('#input_id' + idArray[key][index]).attr('disabled', true);
							$('#input_direction' + idArray[key][index]).attr('disabled', true);
							$('#input_out' + idArray[key][index]).attr('disabled', true);
							$('#input_result' + idArray[key][index]).attr('disabled', true);
							$('#summit_modify' + idArray[key][index]).attr('disabled', true);

							$('#enable_modify' + idArray[key][index]).attr('disabled', false);
							
						}
						
						if (Comp)
							return true;
						else
							return false;

//						console.log('TempPlayer = ' + dataArray[index][0])

//						BaseballRef.child(idArray[key][index]).update({
//							'Player': dataArray[index][0],
//							'base1': dataArray[index][1],
//							'base2': dataArray[index][2],
//							'base3': dataArray[index][3],
//							'id': dataArray[index][4],
//							'direction': dataArray[index][5],
//							'out': dataArray[index][6],
//							'result': dataArray[index][7]
//						});

					}
					
					if (GroupCompare())
						console.log('Input True')
					else
						console.log('Input False')
					
//					modifiedArray.push(key);
//					
//					var length = modifiedArray.length;
//					
//					for (var i=0; i < length; i++) {
//						$("#"+modifiedArray[i]).css("background-color", "#8064A1")
//					}
				});

			  }, i * 1000);
			};
			
			funcA( funcB );
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
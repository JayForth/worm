
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

  var PACKAGE_PATH;
  if (typeof window === 'object') {
    PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
  } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
    Module['locateFile'](REMOTE_PACKAGE_BASE) :
    ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);

    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;

    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onerror = function(event) {
        throw new Error("NetworkError for: " + packageName);
      }
      xhr.onload = function(event) {
        if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
          var packageData = xhr.response;
          callback(packageData);
        } else {
          throw new Error(xhr.statusText + " : " + xhr.responseURL);
        }
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);

      function DataRequest(start, end, crunched, audio) {
        this.start = start;
        this.end = end;
        this.crunched = crunched;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency']('fp ' + this.name);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

        },
        finish: function(byteArray) {
          var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      }
    };

    var files = metadata.files;
    for (i = 0; i < files.length; ++i) {
      new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
    }


    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    var IDB_RO = "readonly";
    var IDB_RW = "readwrite";
    var DB_NAME = "EM_PRELOAD_CACHE";
    var DB_VERSION = 1;
    var METADATA_STORE_NAME = 'METADATA';
    var PACKAGE_STORE_NAME = 'PACKAGES';
    function openDatabase(callback, errback) {
      try {
        var openRequest = indexedDB.open(DB_NAME, DB_VERSION);
      } catch (e) {
        return errback(e);
      }
      openRequest.onupgradeneeded = function(event) {
        var db = event.target.result;

        if(db.objectStoreNames.contains(PACKAGE_STORE_NAME)) {
          db.deleteObjectStore(PACKAGE_STORE_NAME);
        }
        var packages = db.createObjectStore(PACKAGE_STORE_NAME);

        if(db.objectStoreNames.contains(METADATA_STORE_NAME)) {
          db.deleteObjectStore(METADATA_STORE_NAME);
        }
        var metadata = db.createObjectStore(METADATA_STORE_NAME);
      };
      openRequest.onsuccess = function(event) {
        var db = event.target.result;
        callback(db);
      };
      openRequest.onerror = function(error) {
        errback(error);
      };
    };

    /* Check if there's a cached package, and if so whether it's the latest available */
    function checkCachedPackage(db, packageName, callback, errback) {
      var transaction = db.transaction([METADATA_STORE_NAME], IDB_RO);
      var metadata = transaction.objectStore(METADATA_STORE_NAME);

      var getRequest = metadata.get("metadata/" + packageName);
      getRequest.onsuccess = function(event) {
        var result = event.target.result;
        if (!result) {
          return callback(false);
        } else {
          return callback(PACKAGE_UUID === result.uuid);
        }
      };
      getRequest.onerror = function(error) {
        errback(error);
      };
    };

    function fetchCachedPackage(db, packageName, callback, errback) {
      var transaction = db.transaction([PACKAGE_STORE_NAME], IDB_RO);
      var packages = transaction.objectStore(PACKAGE_STORE_NAME);

      var getRequest = packages.get("package/" + packageName);
      getRequest.onsuccess = function(event) {
        var result = event.target.result;
        callback(result);
      };
      getRequest.onerror = function(error) {
        errback(error);
      };
    };

    function cacheRemotePackage(db, packageName, packageData, packageMeta, callback, errback) {
      var transaction_packages = db.transaction([PACKAGE_STORE_NAME], IDB_RW);
      var packages = transaction_packages.objectStore(PACKAGE_STORE_NAME);

      var putPackageRequest = packages.put(packageData, "package/" + packageName);
      putPackageRequest.onsuccess = function(event) {
        var transaction_metadata = db.transaction([METADATA_STORE_NAME], IDB_RW);
        var metadata = transaction_metadata.objectStore(METADATA_STORE_NAME);
        var putMetadataRequest = metadata.put(packageMeta, "metadata/" + packageName);
        putMetadataRequest.onsuccess = function(event) {
          callback(packageData);
        };
        putMetadataRequest.onerror = function(error) {
          errback(error);
        };
      };
      putPackageRequest.onerror = function(error) {
        errback(error);
      };
    };

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;

        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          DataRequest.prototype.requests[files[i].filename].onload();
        }
        Module['removeRunDependency']('datafile_game.data');

      };
      Module['addRunDependency']('datafile_game.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      function preloadFallback(error) {
        console.error(error);
        console.error('falling back to default preload behavior');
        fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, processPackageData, handleError);
      };

      openDatabase(
        function(db) {
          checkCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME,
            function(useCached) {
              Module.preloadResults[PACKAGE_NAME] = {fromCache: useCached};
              if (useCached) {
                console.info('loading ' + PACKAGE_NAME + ' from cache');
                fetchCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME, processPackageData, preloadFallback);
              } else {
                console.info('loading ' + PACKAGE_NAME + ' from remote');
                fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE,
                  function(packageData) {
                    cacheRemotePackage(db, PACKAGE_PATH + PACKAGE_NAME, packageData, {uuid:PACKAGE_UUID}, processPackageData,
                      function(error) {
                        console.error(error);
                        processPackageData(packageData);
                      });
                  }
                  , preloadFallback);
              }
            }
            , preloadFallback);
        }
        , preloadFallback);

      if (Module['setStatus']) Module['setStatus']('Downloading...');

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

  }
  loadPackage({"package_uuid":"673aca25-b4f5-406a-bd35-728355944fb3","remote_package_size":14326220,"files":[{"filename":"","crunched":0,"start":0,"end":50,"audio":false},{"filename":"","crunched":0,"start":50,"end":349,"audio":false},{"filename":"","crunched":0,"start":349,"end":422,"audio":false},{"filename":"","crunched":0,"start":422,"end":445,"audio":false},{"filename":"","crunched":0,"start":445,"end":923,"audio":false},{"filename":"","crunched":0,"start":923,"end":1819,"audio":false},{"filename":"","crunched":0,"start":1819,"end":6545,"audio":false},{"filename":"","crunched":0,"start":6545,"end":6734,"audio":false},{"filename":"","crunched":0,"start":6734,"end":7158,"audio":false},{"filename":"","crunched":0,"start":7158,"end":8807,"audio":false},{"filename":"","crunched":0,"start":8807,"end":9223,"audio":false},{"filename":"","crunched":0,"start":9223,"end":10597,"audio":false},{"filename":"","crunched":0,"start":10597,"end":15495,"audio":false},{"filename":"","crunched":0,"start":15495,"end":16039,"audio":false},{"filename":"","crunched":0,"start":16039,"end":17531,"audio":false},{"filename":"","crunched":0,"start":17531,"end":20314,"audio":false},{"filename":"","crunched":0,"start":20314,"end":22622,"audio":false},{"filename":"","crunched":0,"start":22622,"end":26272,"audio":false},{"filename":"","crunched":0,"start":26272,"end":26569,"audio":false},{"filename":"","crunched":0,"start":26569,"end":26809,"audio":false},{"filename":"","crunched":0,"start":26809,"end":27005,"audio":false},{"filename":"","crunched":0,"start":27005,"end":27201,"audio":false},{"filename":"","crunched":0,"start":27201,"end":27344,"audio":false},{"filename":"","crunched":0,"start":27344,"end":27497,"audio":false},{"filename":"","crunched":0,"start":27497,"end":27619,"audio":false},{"filename":"","crunched":0,"start":27619,"end":27744,"audio":false},{"filename":"","crunched":0,"start":27744,"end":27787,"audio":false},{"filename":"","crunched":0,"start":27787,"end":29503,"audio":false},{"filename":"","crunched":0,"start":29503,"end":29544,"audio":false},{"filename":"","crunched":0,"start":29544,"end":29585,"audio":false},{"filename":"","crunched":0,"start":29585,"end":29744,"audio":false},{"filename":"","crunched":0,"start":29744,"end":35155,"audio":false},{"filename":"","crunched":0,"start":35155,"end":35536,"audio":false},{"filename":"","crunched":0,"start":35536,"end":35857,"audio":false},{"filename":"","crunched":0,"start":35857,"end":36646,"audio":false},{"filename":"","crunched":0,"start":36646,"end":37037,"audio":false},{"filename":"","crunched":0,"start":37037,"end":37363,"audio":false},{"filename":"","crunched":0,"start":37363,"end":38172,"audio":false},{"filename":"","crunched":0,"start":38172,"end":38547,"audio":false},{"filename":"","crunched":0,"start":38547,"end":38865,"audio":false},{"filename":"","crunched":0,"start":38865,"end":39642,"audio":false},{"filename":"","crunched":0,"start":39642,"end":43505,"audio":false},{"filename":"","crunched":0,"start":43505,"end":54845,"audio":false},{"filename":"","crunched":0,"start":54845,"end":82694,"audio":false},{"filename":"","crunched":0,"start":82694,"end":83792,"audio":false},{"filename":"","crunched":0,"start":83792,"end":84656,"audio":false},{"filename":"","crunched":0,"start":84656,"end":97439,"audio":false},{"filename":"","crunched":0,"start":97439,"end":105947,"audio":false},{"filename":"","crunched":0,"start":105947,"end":106042,"audio":false},{"filename":"","crunched":0,"start":106042,"end":162059,"audio":false},{"filename":"","crunched":0,"start":162059,"end":163520,"audio":false},{"filename":"","crunched":0,"start":163520,"end":165376,"audio":false},{"filename":"","crunched":0,"start":165376,"end":165769,"audio":false},{"filename":"","crunched":0,"start":165769,"end":166394,"audio":false},{"filename":"","crunched":0,"start":166394,"end":166788,"audio":false},{"filename":"","crunched":0,"start":166788,"end":167368,"audio":false},{"filename":"","crunched":0,"start":167368,"end":167848,"audio":false},{"filename":"","crunched":0,"start":167848,"end":168520,"audio":false},{"filename":"","crunched":0,"start":168520,"end":168948,"audio":false},{"filename":"","crunched":0,"start":168948,"end":169584,"audio":false},{"filename":"","crunched":0,"start":169584,"end":170052,"audio":false},{"filename":"","crunched":0,"start":170052,"end":170729,"audio":false},{"filename":"","crunched":0,"start":170729,"end":171240,"audio":false},{"filename":"","crunched":0,"start":171240,"end":172072,"audio":false},{"filename":"","crunched":0,"start":172072,"end":172801,"audio":false},{"filename":"","crunched":0,"start":172801,"end":173827,"audio":false},{"filename":"","crunched":0,"start":173827,"end":174444,"audio":false},{"filename":"","crunched":0,"start":174444,"end":175342,"audio":false},{"filename":"","crunched":0,"start":175342,"end":175516,"audio":false},{"filename":"","crunched":0,"start":175516,"end":176159,"audio":false},{"filename":"","crunched":0,"start":176159,"end":176956,"audio":false},{"filename":"","crunched":0,"start":176956,"end":178166,"audio":false},{"filename":"","crunched":0,"start":178166,"end":178465,"audio":false},{"filename":"","crunched":0,"start":178465,"end":179068,"audio":false},{"filename":"","crunched":0,"start":179068,"end":179563,"audio":false},{"filename":"","crunched":0,"start":179563,"end":180299,"audio":false},{"filename":"","crunched":0,"start":180299,"end":181956,"audio":false},{"filename":"","crunched":0,"start":181956,"end":182053,"audio":false},{"filename":"","crunched":0,"start":182053,"end":188170,"audio":false},{"filename":"","crunched":0,"start":188170,"end":189152,"audio":false},{"filename":"","crunched":0,"start":189152,"end":191539,"audio":false},{"filename":"","crunched":0,"start":191539,"end":191595,"audio":false},{"filename":"","crunched":0,"start":191595,"end":192578,"audio":false},{"filename":"","crunched":0,"start":192578,"end":193599,"audio":false},{"filename":"","crunched":0,"start":193599,"end":194222,"audio":false},{"filename":"","crunched":0,"start":194222,"end":195802,"audio":false},{"filename":"","crunched":0,"start":195802,"end":199212,"audio":false},{"filename":"","crunched":0,"start":199212,"end":199910,"audio":false},{"filename":"","crunched":0,"start":199910,"end":202084,"audio":false},{"filename":"","crunched":0,"start":202084,"end":203342,"audio":false},{"filename":"","crunched":0,"start":203342,"end":203865,"audio":false},{"filename":"","crunched":0,"start":203865,"end":204374,"audio":false},{"filename":"","crunched":0,"start":204374,"end":204665,"audio":false},{"filename":"","crunched":0,"start":204665,"end":205040,"audio":false},{"filename":"","crunched":0,"start":205040,"end":205697,"audio":false},{"filename":"","crunched":0,"start":205697,"end":206009,"audio":false},{"filename":"","crunched":0,"start":206009,"end":207333,"audio":false},{"filename":"","crunched":0,"start":207333,"end":208969,"audio":false},{"filename":"","crunched":0,"start":208969,"end":209486,"audio":false},{"filename":"","crunched":0,"start":209486,"end":213468,"audio":false},{"filename":"","crunched":0,"start":213468,"end":216482,"audio":false},{"filename":"","crunched":0,"start":216482,"end":217448,"audio":false},{"filename":"","crunched":0,"start":217448,"end":217711,"audio":false},{"filename":"","crunched":0,"start":217711,"end":217876,"audio":false},{"filename":"","crunched":0,"start":217876,"end":224836,"audio":false},{"filename":"","crunched":0,"start":224836,"end":225122,"audio":false},{"filename":"","crunched":0,"start":225122,"end":225385,"audio":false},{"filename":"","crunched":0,"start":225385,"end":227585,"audio":false},{"filename":"","crunched":0,"start":227585,"end":228669,"audio":false},{"filename":"","crunched":0,"start":228669,"end":230244,"audio":false},{"filename":"","crunched":0,"start":230244,"end":238984,"audio":false},{"filename":"","crunched":0,"start":238984,"end":239480,"audio":false},{"filename":"","crunched":0,"start":239480,"end":252160,"audio":false},{"filename":"","crunched":0,"start":252160,"end":254815,"audio":false},{"filename":"","crunched":0,"start":254815,"end":255606,"audio":false},{"filename":"","crunched":0,"start":255606,"end":256637,"audio":false},{"filename":"","crunched":0,"start":256637,"end":266778,"audio":false},{"filename":"","crunched":0,"start":266778,"end":271519,"audio":false},{"filename":"","crunched":0,"start":271519,"end":271550,"audio":false},{"filename":"","crunched":0,"start":271550,"end":279176,"audio":false},{"filename":"","crunched":0,"start":279176,"end":282376,"audio":false},{"filename":"","crunched":0,"start":282376,"end":283486,"audio":false},{"filename":"","crunched":0,"start":283486,"end":284163,"audio":false},{"filename":"","crunched":0,"start":284163,"end":288881,"audio":false},{"filename":"","crunched":0,"start":288881,"end":290120,"audio":false},{"filename":"","crunched":0,"start":290120,"end":291419,"audio":false},{"filename":"","crunched":0,"start":291419,"end":292496,"audio":false},{"filename":"","crunched":0,"start":292496,"end":293523,"audio":false},{"filename":"","crunched":0,"start":293523,"end":298771,"audio":false},{"filename":"","crunched":0,"start":298771,"end":298851,"audio":false},{"filename":"","crunched":0,"start":298851,"end":298904,"audio":false},{"filename":"","crunched":0,"start":298904,"end":299019,"audio":false},{"filename":"","crunched":0,"start":299019,"end":299218,"audio":false},{"filename":"","crunched":0,"start":299218,"end":299226,"audio":false},{"filename":"","crunched":0,"start":299226,"end":299266,"audio":false},{"filename":"","crunched":0,"start":299266,"end":299976,"audio":false},{"filename":"","crunched":0,"start":299976,"end":300944,"audio":false},{"filename":"","crunched":0,"start":300944,"end":306168,"audio":false},{"filename":"","crunched":0,"start":306168,"end":307271,"audio":false},{"filename":"","crunched":0,"start":307271,"end":308436,"audio":false},{"filename":"","crunched":0,"start":308436,"end":314234,"audio":false},{"filename":"","crunched":0,"start":314234,"end":317484,"audio":false},{"filename":"","crunched":0,"start":317484,"end":329162,"audio":false},{"filename":"","crunched":0,"start":329162,"end":430268,"audio":false},{"filename":"","crunched":0,"start":430268,"end":436891,"audio":false},{"filename":"","crunched":0,"start":436891,"end":436913,"audio":false},{"filename":"","crunched":0,"start":436913,"end":436937,"audio":false},{"filename":"","crunched":0,"start":436937,"end":436966,"audio":false},{"filename":"","crunched":0,"start":436966,"end":437456,"audio":false},{"filename":"","crunched":0,"start":437456,"end":438308,"audio":false},{"filename":"","crunched":0,"start":438308,"end":439126,"audio":false},{"filename":"","crunched":0,"start":439126,"end":459926,"audio":false},{"filename":"","crunched":0,"start":459926,"end":477486,"audio":false},{"filename":"","crunched":0,"start":477486,"end":504957,"audio":true},{"filename":"","crunched":0,"start":504957,"end":681563,"audio":true},{"filename":"","crunched":0,"start":681563,"end":746473,"audio":true},{"filename":"","crunched":0,"start":746473,"end":758781,"audio":true},{"filename":"","crunched":0,"start":758781,"end":783382,"audio":true},{"filename":"","crunched":0,"start":783382,"end":1341022,"audio":true},{"filename":"","crunched":0,"start":1341022,"end":1605666,"audio":true},{"filename":"","crunched":0,"start":1605666,"end":1605723,"audio":false},{"filename":"","crunched":0,"start":1605723,"end":1628361,"audio":false},{"filename":"","crunched":0,"start":1628361,"end":1661128,"audio":false},{"filename":"","crunched":0,"start":1661128,"end":1664616,"audio":false},{"filename":"","crunched":0,"start":1664616,"end":1665337,"audio":false},{"filename":"","crunched":0,"start":1665337,"end":1666187,"audio":false},{"filename":"","crunched":0,"start":1666187,"end":1670698,"audio":false},{"filename":"","crunched":0,"start":1670698,"end":1680327,"audio":false},{"filename":"","crunched":0,"start":1680327,"end":1686790,"audio":false},{"filename":"","crunched":0,"start":1686790,"end":1701436,"audio":false},{"filename":"","crunched":0,"start":1701436,"end":1709864,"audio":false},{"filename":"","crunched":0,"start":1709864,"end":1718700,"audio":false},{"filename":"","crunched":0,"start":1718700,"end":1720026,"audio":false},{"filename":"","crunched":0,"start":1720026,"end":1727619,"audio":false},{"filename":"","crunched":0,"start":1727619,"end":1727676,"audio":false},{"filename":"","crunched":0,"start":1727676,"end":1733946,"audio":false},{"filename":"","crunched":0,"start":1733946,"end":3058300,"audio":false},{"filename":"","crunched":0,"start":3058300,"end":3358567,"audio":false},{"filename":"","crunched":0,"start":3358567,"end":3407096,"audio":false},{"filename":"","crunched":0,"start":3407096,"end":3416389,"audio":false},{"filename":"","crunched":0,"start":3416389,"end":3476739,"audio":false},{"filename":"","crunched":0,"start":3476739,"end":3556341,"audio":false},{"filename":"","crunched":0,"start":3556341,"end":3608335,"audio":false},{"filename":"","crunched":0,"start":3608335,"end":3954257,"audio":false},{"filename":"","crunched":0,"start":3954257,"end":3955638,"audio":false},{"filename":"","crunched":0,"start":3955638,"end":3958350,"audio":false},{"filename":"","crunched":0,"start":3958350,"end":3962037,"audio":false},{"filename":"","crunched":0,"start":3962037,"end":3962757,"audio":false},{"filename":"","crunched":0,"start":3962757,"end":3971837,"audio":false},{"filename":"","crunched":0,"start":3971837,"end":3973143,"audio":false},{"filename":"","crunched":0,"start":3973143,"end":3974812,"audio":false},{"filename":"","crunched":0,"start":3974812,"end":3976474,"audio":false},{"filename":"","crunched":0,"start":3976474,"end":3980637,"audio":false},{"filename":"","crunched":0,"start":3980637,"end":3981800,"audio":false},{"filename":"","crunched":0,"start":3981800,"end":3982312,"audio":false},{"filename":"","crunched":0,"start":3982312,"end":3982962,"audio":false},{"filename":"","crunched":0,"start":3982962,"end":3986461,"audio":false},{"filename":"","crunched":0,"start":3986461,"end":3989786,"audio":false},{"filename":"","crunched":0,"start":3989786,"end":3990437,"audio":false},{"filename":"","crunched":0,"start":3990437,"end":3991863,"audio":false},{"filename":"","crunched":0,"start":3991863,"end":3996764,"audio":false},{"filename":"","crunched":0,"start":3996764,"end":4322218,"audio":false},{"filename":"","crunched":0,"start":4322218,"end":9042944,"audio":false},{"filename":"","crunched":0,"start":9042944,"end":9050105,"audio":false},{"filename":"","crunched":0,"start":9050105,"end":9050965,"audio":false},{"filename":"","crunched":0,"start":9050965,"end":9062245,"audio":false},{"filename":"","crunched":0,"start":9062245,"end":9067146,"audio":false},{"filename":"","crunched":0,"start":9067146,"end":9453344,"audio":false},{"filename":"","crunched":0,"start":9453344,"end":14199449,"audio":false},{"filename":"","crunched":0,"start":14199449,"end":14202872,"audio":false},{"filename":"","crunched":0,"start":14202872,"end":14210033,"audio":false},{"filename":"","crunched":0,"start":14210033,"end":14210893,"audio":false},{"filename":"","crunched":0,"start":14210893,"end":14214072,"audio":false},{"filename":"","crunched":0,"start":14214072,"end":14226534,"audio":false},{"filename":"","crunched":0,"start":14226534,"end":14227717,"audio":false},{"filename":"","crunched":0,"start":14227717,"end":14247108,"audio":false},{"filename":"","crunched":0,"start":14247108,"end":14256636,"audio":false},{"filename":"","crunched":0,"start":14256636,"end":14258321,"audio":false},{"filename":"","crunched":0,"start":14258321,"end":14275178,"audio":false},{"filename":"","crunched":0,"start":14275178,"end":14275236,"audio":false},{"filename":"","crunched":0,"start":14275236,"end":14275428,"audio":false},{"filename":"","crunched":0,"start":14275428,"end":14275787,"audio":false},{"filename":"","crunched":0,"start":14275787,"end":14275928,"audio":false},{"filename":"","crunched":0,"start":14275928,"end":14276056,"audio":false},{"filename":"","crunched":0,"start":14276056,"end":14276070,"audio":false},{"filename":"","crunched":0,"start":14276070,"end":14276254,"audio":false},{"filename":"","crunched":0,"start":14276254,"end":14282630,"audio":false},{"filename":"","crunched":0,"start":14282630,"end":14282675,"audio":false},{"filename":"","crunched":0,"start":14282675,"end":14282709,"audio":false},{"filename":"","crunched":0,"start":14282709,"end":14283486,"audio":false},{"filename":"","crunched":0,"start":14283486,"end":14284586,"audio":false},{"filename":"","crunched":0,"start":14284586,"end":14285406,"audio":false},{"filename":"","crunched":0,"start":14285406,"end":14287414,"audio":false},{"filename":"","crunched":0,"start":14287414,"end":14287583,"audio":false},{"filename":"","crunched":0,"start":14287583,"end":14289162,"audio":false},{"filename":"","crunched":0,"start":14289162,"end":14292930,"audio":false},{"filename":"","crunched":0,"start":14292930,"end":14293050,"audio":false},{"filename":"","crunched":0,"start":14293050,"end":14293825,"audio":false},{"filename":"","crunched":0,"start":14293825,"end":14300649,"audio":false},{"filename":"","crunched":0,"start":14300649,"end":14301225,"audio":false},{"filename":"","crunched":0,"start":14301225,"end":14302537,"audio":false},{"filename":"","crunched":0,"start":14302537,"end":14302783,"audio":false},{"filename":"","crunched":0,"start":14302783,"end":14305121,"audio":false},{"filename":"","crunched":0,"start":14305121,"end":14305700,"audio":false},{"filename":"","crunched":0,"start":14305700,"end":14307322,"audio":false},{"filename":"","crunched":0,"start":14307322,"end":14308431,"audio":false},{"filename":"","crunched":0,"start":14308431,"end":14309542,"audio":false},{"filename":"","crunched":0,"start":14309542,"end":14317457,"audio":false},{"filename":"","crunched":0,"start":14317457,"end":14320788,"audio":false},{"filename":"","crunched":0,"start":14320788,"end":14320894,"audio":false},{"filename":"","crunched":0,"start":14320894,"end":14321574,"audio":false},{"filename":"","crunched":0,"start":14321574,"end":14321683,"audio":false},{"filename":"","crunched":0,"start":14321683,"end":14325699,"audio":false},{"filename":"","crunched":0,"start":14325699,"end":14326193,"audio":false},{"filename":"","crunched":0,"start":14326193,"end":14326220,"audio":false}]});

})();

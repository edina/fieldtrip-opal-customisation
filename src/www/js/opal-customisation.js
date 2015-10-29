/*
Copyright (c) 2015, EDINA
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.
* Neither the name of EDINA nor the names of its contributors may be used to
  endorse or promote products derived from this software without specific prior
  written permission.

THIS SOFTWARE IS PROVIDED BY EDINA ''AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
SHALL EDINA BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
DAMAGE.
*/

"use strict";
/* global cordova */


define(['utils', './ext/pcapi', 'records', 'file'], function(utils, pcapi, records, file){

    /**
     * Download item from cloud provider.
     * @param options:
     *   userId - User id (optional)
     *   fileName - the name of item
     *   remoteDir - the name of the directory on the server
     *   localDir - cordova fileEntry pointing to the local directory where the item will be downloaded.
     *   targetName - the name with which the file will be stored on the phone
     * @param success Function will be called when item is successfully downloaded.
     * @param error Function will be called when an error has occurred.
     */
    var downloadItem = function(options, success, error) {
        var itemUrl = pcapi.buildUrl(options.remoteDir, options.fileName);
        //if there's a userId then change the userID
        if(options.userId){
            itemUrl = pcapi.buildUserUrl(options.userId, options.remoteDir, options.fileName);
        }

        var target = file.getFilePath(options.localDir)+'/'+options.targetName;

        file.ftDownload(itemUrl, target, success, error);
    };

    var editor = "5106d3aa-99ac-4186-b50d-6fcfdf9946f4.edtr";
    var userId = utils.getAnonymousUserId();
    var path = records.getEditorsDir(records.EDITOR_GROUP.PUBLIC);
    var options = {
        "userId": userId,
        "fileName": editor,
        "remoteDir": "editors",
        "localDir": path,
        "targetName": editor
    };

    downloadItem(options, function(entry){
        if(entry.name.indexOf(".edtr") > -1){
            records.addEditor(entry, records.EDITOR_GROUP.PUBLIC);
        }
    });

});
#By Fptbb
#Configura VSCode, Git e Nodejs (Latest) na maquina e seta os Paths
$arch = "64" #64x ou 86x Padrão: 86x(32x)
$NodeVersion = "lts" #lts ou latest Padrão: latest

function download {
    param (
	  $RemoteFile,
	  $DownloadFile,
	  [bool]$DoExtractFile = $False,
	  [string]$ExecutePath = $null,
	  $AddedPath
    )

    Write-Host $RemoteFile
	Write-Host $DownloadFile

	$wc = New-Object System.Net.WebClient
	$wc.DownloadFile($RemoteFile, $DownloadFile)
	
	If ($DoExtractFile){
	  Expand-Archive $DownloadFile -DestinationPath $AddedPath -Force
	}
	If (-Not ([string]::IsNullOrEmpty($ExecutePath))){
	  & "$ExecutePath"
	}  
	$env:Path += ";"+$AddedPath
	[Environment]::SetEnvironmentVariable("Path", $env:Path, [System.EnvironmentVariableTarget]::User);
}

Set-ExecutionPolicy Bypass -Scope Process -Force;
download -RemoteFile "https://go.microsoft.com/fwlink/?Linkid=850641" -DownloadFile $env:Temp"\vscode.zip" -DoExtractFile $true -AddedPath $env:LOCALAPPDATA"\VsCode"
download -RemoteFile "https://fptbb.com/program/latest/Node?arch=$arch&version=$NodeVersion" -DownloadFile $env:Temp'\node.zip' -DoExtractFile $true -AddedPath $env:LOCALAPPDATA"\Node"
Move-Item -Path $env:LOCALAPPDATA"\Node\node" -Destination $env:LOCALAPPDATA"\Node1"
Remove-item -Path $env:LOCALAPPDATA"\Node"
Rename-item -Path $env:LOCALAPPDATA"\Node1" -NewName $env:LOCALAPPDATA"\Node"
npm install yarn -g
download -RemoteFile "https://fptbb.com/program/latest/PortableGit?arch=$arch" -DownloadFile $env:TEMP'\PortableGit.exe' -DoExtractFile $false -AddedPath $env:LOCALAPPDATA'\Git' -Debug
& $env:TEMP'\PortableGit.exe' -o $env:LOCALAPPDATA'\Git' -y

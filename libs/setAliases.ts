import { App } from "obsidian";

function getAlias(title: string) {
	const aliasMatch = title.match(/^[a-zA-Z0-9]+[_-](.+)$/);
	if (!aliasMatch) {
		return null;
	}
	return aliasMatch[1];
}

export default async function setAliases(app: App) {
	const activeFile = app.workspace.getActiveFile();
	if (!activeFile) {
		throw new Error("アクティブなファイルが見つかりません。");
	}

	const title = activeFile.basename;
	const alias = getAlias(title);
	if (!alias) {
		throw new Error("タイトルからエイリアスを抽出できませんでした。");
	}
	await app.fileManager.processFrontMatter(activeFile, (fm) => {
		fm.aliases = [alias];
	});
	console.log(`エイリアスを生成しました: ${alias}`);
}

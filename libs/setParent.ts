import { App } from "obsidian";

function getParentId(title: string) {
	const idMatch = title.match(/^([a-zA-Z0-9]+)[_-]/);
	if (!idMatch) {
		return null;
	}
	const id = idMatch[1];
	// 末尾1文字を削除（IDが1文字の場合はnull）
	if (id.length <= 1) {
		return null;
	}
	return id.slice(0, -1);
}

export default async function setParent(app: App) {
	const activeFile = app.workspace.getActiveFile();
	if (!activeFile) {
		throw new Error("アクティブなファイルが見つかりません。");
	}

	const title = activeFile.basename;
	const parentId = getParentId(title);
	if (!parentId) {
		throw new Error("親メモのIDを抽出できませんでした。");
	}
	const files = app.vault.getMarkdownFiles();
	const parentNote = files.filter((file) =>
		file.name.startsWith(parentId + "_")
	);
	if (!parentNote) {
		throw new Error("親メモが見つかりませんでした。");
	}
	await app.fileManager.processFrontMatter(activeFile, (fm) => {
		fm.parent = "[[" + parentNote[0].basename + "]]";
	});

	// new Notice(`親メモをリンクしました: ${parentNote[0].basename}`, 2000);
	console.log(`親メモをリンクしました: ${parentNote[0].basename}`);
}

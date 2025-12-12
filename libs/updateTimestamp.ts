import { App } from "obsidian";
import moment from "moment";

export default async function updateTimestamp(app: App) {
	const activeFile = app.workspace.getActiveFile();
	if (!activeFile) {
		throw new Error("アクティブなファイルが見つかりません。");
	}

	await app.fileManager.processFrontMatter(activeFile, (fm) => {
		fm.updated_at = moment().format("YYYY/MM/DD HH:mm");
	});

	// new Notice("タイムスタンプを更新しました。", 2000);
	console.log("タイムスタンプを更新しました。");
}
